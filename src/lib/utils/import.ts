/**
 * Import file format
 * Each "section" is separated by the following symbol: ¤
 * Each "column" and "row" is separated by the following symbol: §
 *
 * Section 1: Number of rounds. Add 1 for the finals
 *
 * Section 2: Players data
 * For each player, fill the following data:
 * - finalRank    => Position where the player ended in the tournament.
 *                   Can also be DQ or WD if the player was disqualified or left the tournament;
 * - firstName    => Player's first name, same as V:EKN registration;
 * - lastName     => Player's last name, same as V:EKN registration;
 * - city         => Player's city, same as V:EKN registration;
 * - veknID       => Player's V:EKN ID, same as V:EKN registration;
 * - gw           => How many GWs the player got before the finals;
 * - vp           => How many VPs the player got before the finals;
 * - finalVP      => How many VPs the player got during the finals;
 * - tablePoints  => How many TPs the player got before the finals;
 * - coinRanking  => If some players are tied for a slot in the finals,
 *                   coinranking should be a positive integer,
 *                   where the players with the lowest numbers get a spot in the finals;
 * - ratingPoints => Unused, will be recalculated in the server.
 *
 * Section 3: Tables data
 * For each table, fill the following data:
 * - round        => 0 for the final round, the number of the round otherwise
 * Repeat the following for each player in the table.
 * If there's only 4 players, add another one, with an empty VEKN ID, VPs and TPs;
 * - playerVeknID => Player's V:EKN ID, same as V:EKN registration;
 * - playerVP     => How many VPs the player got in this table;
 * - playerTP     => How many TPs the player got in this table;
 * Then, add at the end
 * - tableGW      => Player's V:EKN ID of whoever got the GW; If no one got the GW, put 0;
 */
import { stRounds, stPlayers } from '$lib/stores';
import { get } from 'svelte/store';
import { sortPlayers } from './player';
import {
	RoundState,
	type IPlayer,
	type IRound,
	type IRoundPlayer,
	RoundTableState,
	type IRoundTable
} from '$lib/types';

export async function downloadTournamentFile() {
	const content = await exportTournamentFile();

	const a = document.createElement('a');
	const file = new Blob([content], { type: 'text/plain' });
	a.href = URL.createObjectURL(file);
	a.download = 'praetor-data.txt';
	a.click();
	URL.revokeObjectURL(a.href);
}

export async function exportTournamentFile() {
	// Summarize player information
	stPlayers.updateResults();

	const rounds = get(stRounds);
	const sortedPlayers = sortPlayers(get(stPlayers));

	let playersData = '';
	let tablesData = '';

	const numRounds = rounds.length;
	const finalRound = numRounds - 1;

	// Update players data
	await Promise.all(
		sortedPlayers.map(async (player, idx) => {
			let finalRank: number | string = idx + 1;
			if (player.dq) finalRank = 'DQ';
			if (player.wd) finalRank = 'WD';

			playersData += finalRank + '§';
			playersData += player.firstName + '§';
			playersData += player.lastName + '§';
			playersData += '§'; // City - Can leave empty
			playersData += player.id + '§';
			playersData += player.gw + '§';
			playersData += player.vp + '§';
			playersData += player.vpFinals + '§';
			playersData += player.tp + '§';
			playersData += 0 + '§'; // Coin Ranking - Have to check what to input
			playersData += '§'; // Estimated Rating Points - Can leave empty
		})
	);

	// Set tables data
	rounds.forEach((round, i) => {
		const roundIdx = i === finalRound ? 0 : i + 1;
		round.tables.forEach((table) => {
			const tableData: Array<number | string> = [roundIdx];
			let tableGW = 0;
			table.players.forEach((player) => {
				tableData.push(player.id, player.vp, player.tp);
				if (player.gw) tableGW = player.id;
			});

			if (table.players.length === 4) tableData.push('', '', '');
			tableData.push(tableGW);
			tablesData += tableData.join('§') + '§';
		});
	});

	return `${numRounds}¤${playersData}¤${tablesData}`;
}

export function uploadTournamentFile() {
	const input = document.createElement('input');
	input.type = 'file';
	input.click();

	input.onchange = (e: Event) => {
		console.log('onChange');
		if (!(e.target instanceof HTMLInputElement)) return;
		const file = e.target.files?.[0];
		if (!file) return;

		// setting up the reader
		const reader = new FileReader();
		reader.readAsText(file, 'UTF-8');

		// here we tell the reader what to do when it's done reading...
		reader.onload = (readerEvent) => {
			const content = readerEvent.target?.result; // this is the content!
			if (!content) return;
			if (typeof content !== 'string') return;
			importTournamentData(content);
		};

		input.remove();
	};

	// Read file
	const tournamentFile = '';

	return tournamentFile;
}

function importTournamentData(content: string) {
	const [roundNumRaw, playerDataRaw, tableDataRaw] = content.split('¤');
	console.log('ROUND_NUM', roundNumRaw);
	console.log('PLAYER_DATA', playerDataRaw);
	console.log('TABLE_DATA', tableDataRaw);

	const roundNum = parseInt(roundNumRaw);
	const playerData = playerDataRaw.split('§');
	const tableData = tableDataRaw.split('§');

	const players = [];
	const newPlayer: IPlayer = {
		id: 0,
		firstName: '',
		lastName: '',
		vp: 0,
		gw: 0,
		tp: 0,
		coin: 0,
		vpFinals: 0,
		dq: false,
		wd: false
	};

	let player = structuredClone(newPlayer);

	for (let i = 0, iMax = playerData.length - 1; i < iMax; i++) {
		const col = i % 11;
		const val = playerData[i];
		switch (col) {
			case 0: // finalRank
				if (val === 'dq') player.dq = true;
				if (val === 'wd') player.wd = true;
				break;
			case 1: // firstName
				player.firstName = val;
				break;
			case 2: // lastName
				player.lastName = val;
				break;
			case 3: // city
				break;
			case 4: // veknID
				player.id = parseInt(val);
				break;
			case 5: // gw
				player.gw = parseInt(val);
				break;
			case 6: // vp
				player.vp = parseInt(val);
				break;
			case 7: // finalVP
				player.vpFinals = parseInt(val);
				break;
			case 8: // tablePoints
				player.tp = parseInt(val);
				break;
			case 9: // coinRanking
				player.coin = parseInt(val);
				break;
			case 10: // ratingPoints
				players.push(player);
				player = structuredClone(newPlayer);
				break;
		}
	}

	stPlayers.set(players);

	const rounds: IRound[] = [];
	for (let i = 0; i < roundNum; i++) {
		rounds.push({
			tables: [],
			state: RoundState.Empty
		});
	}

	let currentRound = 0;

	const newRoundTable: IRoundTable = {
		players: [],
		state: RoundTableState.InProgress
	};

	const newRoundPlayer: IRoundPlayer = {
		id: 0,
		vp: 0,
		tp: 0,
		gw: 0
	};

	let roundTable = structuredClone(newRoundTable);
	let roundPlayer = structuredClone(newRoundPlayer);

	for (let i = 0, iMax = tableData.length - 1; i < iMax; i++) {
		const col = i % 17;
		const val = parseInt(tableData[i]);
		switch (col) {
			case 0: // round
				if (val === 0) {
					currentRound = roundNum - 1;
				} else {
					currentRound = val - 1;
				}
				break;
			case 1:
			case 4:
			case 7:
			case 10:
				roundPlayer.id = val;
				break;
			case 13:
				if (isNaN(val)) {
					i += 2;
					continue;
				}
				roundPlayer.id = val;
				break;
			case 2:
			case 5:
			case 8:
			case 11:
			case 14:
				roundPlayer.vp = val;
				break;
			case 3:
			case 6:
			case 9:
			case 12:
			case 15:
				roundPlayer.tp = val;
				roundTable.players.push(roundPlayer);
				roundPlayer = structuredClone(newRoundPlayer);
				break;
			case 16:
				rounds[currentRound].tables.push(roundTable);
				rounds[currentRound].state = RoundState.InProgress;
				roundTable = structuredClone(newRoundTable);
				break;
		}
	}

	// Rounds data
	stRounds.set(rounds);
}
