/*

Body must contain
archondata = <archondata>

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

import type { IDbTable } from '$lib/db/db.svelte';
import { stPlayers } from '$lib/stores/players.svelte';
import { stTournament } from '$lib/stores/tournament.svelte';
import { INACTIVE_STATUS } from './status';

function buildTable(table: IDbTable) {
	// <table> = <round>§(<player veknid>§<player vp>§<player tp>§){5}<tablegw>§
	let arch_table = `${table.roundNum % 100}§`;

	for (let p = 0, pMax = table.players.length; p < pMax; p++) {
		const player = table.players[p];
		arch_table += `${player.playerId}§${player.vp}§${player.tp}§`;
	}

	if (table.players.length === 4) arch_table += '§0§0§';

	arch_table += `${table.winnerId}§`;

	return arch_table;
}

/** Builds the report values for VEKN */
export function veknReport() {
	const info = stTournament.info.current;
	const standings = stTournament.standings.current;
	const roundTables = stTournament.tables.current;

	let arch_R = info.rounds;
	if (info.hasFinals) arch_R += 1;

	let finalVps: Record<number, number> = {};
	let arch_tables = '';
	let arch_players = '';

	// Fill tables
	for (let i = 0, iMax = roundTables.length; i < iMax; i++) {
		const table = roundTables[i];
		arch_tables += buildTable(table);

		if (table.roundNum === 100) {
			// Create a table to check player finalvps
			finalVps = table.players.reduce((obj, player) => {
				obj[player.playerId] = player.vp;
				return obj;
			}, finalVps);
		}
	}

	// Fill players
	for (let i = 0, iMax = standings.length; i < iMax; i++) {
		const standing = standings[i];

		const player = stPlayers.getById(standing.playerId);
		if (!player) throw new Error(`Player not found - ${standing.playerId}`);

		const finalrank = INACTIVE_STATUS.includes(standing.status)
			? standing.status.toUpperCase()
			: standing.placement;
		const final_vp = finalVps[player.id] ?? 0;

		// <finalrank>§<firstname>§<lastname>§<city>§<vekn id>§<gw>§<vp>§<final vp>§<tablepoints>§<coinranking>§<ratingpoints>§

		let arch_player = `${finalrank}§${player.firstName}§${player.lastName}§§${player.id}§`;
		arch_player += `${standing.gw}§${standing.vp}§${final_vp}§${standing.tp}§${standing.coinranking}§0§`;

		arch_players += arch_player;
	}

	const arch_archondata = `${arch_R}¤${arch_players}¤${arch_tables}`;
	return arch_archondata;
}
