/**
  2.e) archon
  POST https://www.vekn.net/api/vekn/archon/9955

  P: the number of players
  R: the number of rounds (including the final, so 3 for 2R+F, 4 for 3R+F, and so on)
  T: the total number of tables over the R rounds (+1 if a final round is played)

  <archondata> = <R>¤<player>{P} | <R>¤<player>{P}¤<table>{T}
  <player> = <finalrank>§<firstname>§<lastname>§<city>§<vekn id>§<gw>§<vp>§<final vp>§<tablepoints>§<coinranking>§<ratingpoints>§

  <vekn id> = [0-9]{7}
  <vp> = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
  <tp> = \d+
  <empty> = // empty string

  <finalrank> = 1 | 2 | [5..P] | <dqflag>
  <gw> = [0..R]
  <final vp> = <vp>
  <tablepoints> = <tp>
  <dqflag> = DQ | WD
  <ratingpoints> = estimated rating points (will be overwritten by the rating points batch)

  <table> = <round>§(<player veknid>§<player vp>§<player tp>§){5}<tablegw>§

  <round> = [0..R] // 0 for the final round if any, the number of the round otherwise
  <tablegw> = 0 | <vekn id> // which player has received the GW (0 if none)
  <player veknid> = <empty> | <vekn id>
  <player vp> = <vp>
  <player tp> = <tp>
*/

import type { IPlayer, IRound, IVeknPlayer } from '$lib/types';
import { sortPlayers } from '$lib/utils/player';
import { playerDB } from '$lib/vekn';
import { veknUrl } from './utils';

const VEKN_USERNAME = 'gdagosto';
const VEKN_PASSWORD = 'dagostosoui1';
let VEKN_TOKEN: string = '';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let NUM_ATTEMPTS = 0;

export function getPlayerRegistryData(playerId: number): Promise<IVeknPlayer> {
	// Get data on VEKN Player Registry
	return fetch(veknUrl(`vekn/registry?filter=${playerId}`), {
		headers: {
			Authorization: `Bearer ${VEKN_TOKEN}`
		}
	})
		.then((response) => {
			if (!response.ok) throw new Error(`HTTP error ${response.status}`);
			return response.json();
		})
		.then(async (data) => {
			if (data.err_code && data.err_code === 403) {
				if (NUM_ATTEMPTS > 2) throw new Error('Failed to fetch VEKN Data. Please try again later');
				await getVeknAuthToken();
				return getPlayerRegistryData(playerId);
			}

			NUM_ATTEMPTS = 0;
			return data.data.players[0] as IVeknPlayer;
		});
}

async function getVeknAuthToken() {
	NUM_ATTEMPTS += 1;
	const formData = new FormData();
	formData.append('username', VEKN_USERNAME);
	formData.append('password', VEKN_PASSWORD);

	const response: string = await fetch(veknUrl(`vekn/login`), { method: 'post', body: formData })
		.then((response) => {
			if (!response.ok) throw new Error(`HTTP error ${response.status}`);
			return response.json();
		})
		.then(async (data) => {
			if (data.err_code && data.err_code === 403) {
				sleep(100);
				return getVeknAuthToken();
			}

			return data.data.auth;
		});

	VEKN_TOKEN = response;
	return;
}

export async function prepareArchonData(stRounds: IRound[], players: IPlayer[]) {
	NUM_ATTEMPTS = 0;
	let playersData = '';
	let tablesData = '';

	const numRounds = stRounds.length;

	const finalRound = numRounds - 1;
	const playersSet = new Set();

	const sortedPlayers = sortPlayers(players);

	await Promise.all(
		sortedPlayers.map(async (player, idx) => {
			console.log('p', idx, player);
			// Check if player id exists on VEKN DB
			const exists = await playerDB.getPlayerDataByID(player.id);
			if (exists) playersSet.add(player.id);

			const playerData = [];
			const finalRank = player.dq ? 'DQ' : idx + 1;

			playerData.push(finalRank);
			playerData.push(player.firstName);
			playerData.push(player.lastName);
			playerData.push('PLACEHOLDER_CITY');
			playerData.push(player.id);
			playerData.push(player.gw);
			playerData.push(player.vp);
			playerData.push(0);
			playerData.push(player.tp);
			playerData.push(0);
			playerData.push(0);

			// Join and add to playersData
			playersData += playerData.join('§') + '§';
			console.log('playerData', playerData.join('§'));
			console.log('playersData', playersData);
		})
	);

	stRounds.forEach((round, i) => {
		const roundIdx = i === finalRound ? 0 : i + 1;
		round.tables.forEach((table) => {
			const tableData: Array<number | string> = [roundIdx];
			let tableGW = 0;
			table.players.forEach((player) => {
				const playerId = playersSet.has(player.id) ? player.id : '';

				tableData.push(playerId, player.vp, player.tp);
				if (player.gw) tableGW = player.id;
			});
			tableData.push(tableGW);
			tablesData += tableData.join('§') + '§';
		});
	});

	console.log('NUM_ROUNDS', numRounds);
	console.log('PLAYERS_DATA', playersData);
	console.log('TABLES_DATA', tablesData);

	return `${numRounds}¤${playersData}¤${tablesData}`;
}
