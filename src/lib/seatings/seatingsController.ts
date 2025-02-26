import SeatingWorker from './worker/worker.js?worker';
// import { stPlayers, stRounds } from '$lib/stores';
// import { RoundState, type IPlayer, RoundTableState } from '$lib/types';
const seatWorker = new SeatingWorker();

const INACTIVE_STATUS: IDbStanding['status'][] = ['wd', 'dq'];

import { Tween } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import { stTournament } from '$lib/stores/tournament.svelte';
import { db, type IDbStanding } from '$lib/db/db.svelte';

const generationTween = new Tween(0, {
	duration: 100,
	easing: cubicOut
});

export const generationProgress = generationTween.current;

export async function generateRound(idRound: number) {
	// Get previous rounds
	const previousRoundTablesQuery = await db.roundTables
		.where(['tournamentId', 'roundNum'])
		.between([stTournament.id, 0], [stTournament.id, idRound], true, false)
		.toArray();

	console.debug('PREVIOUS_ROUNDS_DB', previousRoundTablesQuery);

	// We need to convert the database data into a number[][][], containing the playerIds.
	// TODO: Populate this item
	const previousRounds: number[][][] = new Array(idRound).fill([]);

	for (let i = 0, iMax = previousRoundTablesQuery.length; i < iMax; i++) {
		const roundTable = previousRoundTablesQuery[i];
		previousRounds[roundTable.roundNum][roundTable.tableNum] = roundTable.players.map(
			(p) => p.playerId
		);
	}

	// Build an array of active player ids
	const activeStandings = stTournament.standings.current.filter(
		(s) => !INACTIVE_STATUS.includes(s.status)
	);

	seatWorker.postMessage({
		type: 'generate',
		roundNumber: idRound,
		previousRounds,
		activeIds: activeStandings.map((s) => s.playerId)
	});
}

export function resetRoundGenerator() {
	seatWorker.postMessage({ type: 'reset' });
}

seatWorker.onmessage = (e) => {
	if (e.data.type === 'cb') {
		generationTween.target = e.data.percent;
	} else if (e.data.type === 'finish') {
		const { round, roundNumber } = e.data;
		onGenerateFinish(roundNumber, round);
	}
};

function onGenerateFinish(roundId: number, round: number[][]) {
	console.debug('ON_GENERATE_FINISH', roundId, round);

	// Save to database
	round.forEach((table, tableIdx) => {
		stTournament.addRoundTable(roundId, tableIdx, table);
	});

	// const idsPerTable = generator.sg.rounds[idRound];
	// const tables = idsPerTable.map((ids) => {
	// 	const players = ids.map((idx) => {
	// 		return {
	// 			id: $stPlayers[idx].id,
	// 			vp: 0,
	// 			gw: 0,
	// 			tp: 0
	// 		};
	// 	});

	// 	return {
	// 		state: RoundTableState.Waiting,
	// 		players
	// 	};
	// });

	// stRounds.updateRound(roundId, {
	// 	state: RoundState.Generated,
	// 	tables
	// });
}

// let $stPlayers: IPlayer[];
// stPlayers.subscribe((val) => ($stPlayers = val));
