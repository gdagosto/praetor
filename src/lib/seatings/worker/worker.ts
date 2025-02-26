import { generateRound } from './class';
import { ITERATIONS } from './constants';

self.onmessage = (e) => {
	if (e.data.type === 'generate') {
		generateRoundSeatings(e.data.roundNumber, e.data.previousRounds, e.data.activeIds);
		// } else if (e.data.type === 'import') {
		// 	importRoundSeatings(e.data.round, e.data.players, e.data.tables);
	}
};

function generateRoundSeatings(
	roundNumber: number,
	previousRounds: number[][][],
	activeIds: number[]
) {
	// We need to convert from playerId to playerIdx [0,1,2,3,4] so we can use the generator
	console.debug('GENERATE_ROUND_SEATINGS | roundNumber', roundNumber);
	console.debug('GENERATE_ROUND_SEATINGS | previousRounds', previousRounds);
	console.debug('GENERATE_ROUND_SEATINGS | activeIds', activeIds);

	const mapperId2Index: Record<number, number> = {};
	const mapperIndex2Id: Record<number, number> = {};
	let curIndex = 0;

	for (let i = 0, iMax = activeIds.length; i < iMax; i++) {
		const playerId = activeIds[i];
		mapperId2Index[playerId] = curIndex;
		mapperIndex2Id[curIndex] = playerId;
		curIndex++;
	}

	const previousRoundsWithIndexes = previousRounds.map((round) =>
		round.map((table) =>
			table.map((playerId) => {
				if (!(playerId in mapperId2Index)) {
					// Add player to the mapping
					mapperId2Index[playerId] = curIndex;
					mapperIndex2Id[curIndex] = playerId;
					curIndex++;
				}
				return mapperId2Index[playerId];
			})
		)
	);

	console.debug('GENERATE_ROUND_SEATINGS | mapperId2Index', mapperId2Index);
	console.debug('GENERATE_ROUND_SEATINGS | mapperIndex2Id', mapperIndex2Id);

	const activePlayersIndexes = activeIds.map((id) => mapperId2Index[id]);
	console.debug('GENERATE_ROUND_SEATINGS | activePlayersIndexes', activePlayersIndexes);

	const t0 = performance.now();
	const { round, score } = generateRound(
		roundNumber,
		previousRoundsWithIndexes,
		activePlayersIndexes,
		curIndex
		// generatorCallback
	);

	const roundWithIds = round.map((table) => table.map((idx) => mapperIndex2Id[idx]));

	console.log('Generating the round took ' + (performance.now() - t0) + ' milliseconds.');
	console.log(`Final score: ${score}. Generated round below`);
	console.log(round);
	console.log(roundWithIds);

	postMessage({
		type: 'finish',
		roundNumber,
		round: roundWithIds
	});
}

// function importRoundSeatings(round: number, players: IPlayer[], tables: IRoundTable[]) {
// 	generator.importRound(round, players, tables);

// 	postMessage({
// 		type: 'import',
// 		roundId: round
// 	});
// }

function generatorCallback(iter: number) {
	postMessage({
		type: 'cb',
		percent: iter / ITERATIONS
	});
}
