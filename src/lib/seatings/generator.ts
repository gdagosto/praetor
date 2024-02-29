import { get } from 'svelte/store';
import SeatingWorker from './worker.js?worker';
import { stPlayers, stRounds } from '$lib/stores';
import { RoundState, type IPlayer, RoundTableState } from '$lib/types';
const seatWorker = new SeatingWorker();

import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

export const generationProgress = tweened(0, {
	duration: 100,
	easing: cubicOut
});

export function generateRound(idRound: number) {
	stRounds.updateRound(idRound, { state: RoundState.Generating });

	seatWorker.postMessage({ type: 'generate', round: idRound, players: get(stPlayers) });
}

export function resetRoundGenerator() {
	seatWorker.postMessage({ type: 'reset' });
}

export function importRounds() {
	const $stRounds = get(stRounds);
	const $stPlayers = get(stPlayers);

	$stRounds.forEach((round, idx) => {
		seatWorker.postMessage({
			type: 'import',
			round: idx,
			players: $stPlayers,
			tables: round.tables
		});
	});
}

seatWorker.onmessage = (e) => {
	if (e.data.type === 'cb') {
		generationProgress.set(e.data.percent);
	} else if (e.data.type === 'finish') {
		const { rounds, roundId } = e.data;
		onGenerateFinish(roundId, rounds[roundId]);
	}
};

function onGenerateFinish(roundId: number, idsPerTable: number[][]) {
	// const idsPerTable = generator.sg.rounds[idRound];
	const tables = idsPerTable.map((ids) => {
		const players = ids.map((idx) => {
			return {
				id: $stPlayers[idx].id,
				vp: 0,
				gw: 0,
				tp: 0
			};
		});

		return {
			state: RoundTableState.Waiting,
			players
		};
	});

	stRounds.updateRound(roundId, {
		state: RoundState.Generated,
		tables
	});
}

let $stPlayers: IPlayer[];
stPlayers.subscribe((val) => ($stPlayers = val));
