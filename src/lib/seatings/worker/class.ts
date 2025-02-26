import { RULES, OPPONENTS, POSITIONS, type IMeasure, ITERATIONS } from './constants';
import { Score } from './score';
import {
	fast2DMatrix,
	fast3DMatrix,
	range,
	sum2D,
	sum3D,
	getRoundGlobalIndexes,
	getRandomInt,
	shuffle
} from './utils';

type IGeneratorCallback = (
	iter: number,
	temp: number,
	score: number,
	trials: number,
	accepts: number,
	improves: number
) => void;

function exampleGeneratorCb(
	iter: number,
	temp: number,
	score: number,
	trials: number,
	accepts: number,
	improves: number
) {
	console.log(`\nIteration ${iter} finished. Temperature: ${temp} | Score: ${score}`);
	console.log(
		`For the past ${trials} trials, ${accepts} were accepted, and ${improves} improved the results`
	);
}

function tablesFromPlayers(playerIds: number[]) {
	const len = playerIds.length;

	if ([6, 7, 11].includes(len)) {
		throw new Error(`Staggered rounds not yet supported.`);
	}

	const fours = 5 - (len % 5 || 5);
	const fives = Math.floor((len - 4 * fours) / 5);

	let startNum = 0;
	const tables = [];

	for (let i = 0; i < fives; i++) {
		tables.push(playerIds.slice(startNum, startNum + 5));
		startNum += 5;
	}

	for (let i = 0; i < fours; i++) {
		tables.push(playerIds.slice(startNum, startNum + 4));
		startNum += 4;
	}

	return tables;
}

export function generateRound(
	roundNumber: number,
	previousRounds: number[][][],
	activePlayers: number[],
	playerCount: number,
	totalRounds: number,
	cb: IGeneratorCallback = exampleGeneratorCb
) {
	console.debug('GENERATE_ROUND | roundNumber', roundNumber);
	console.debug('GENERATE_ROUND | previousRounds', previousRounds);
	console.debug('GENERATE_ROUND | activePlayers', activePlayers);
	console.debug('GENERATE_ROUND | playerCount', playerCount);

	if (previousRounds.length !== roundNumber)
		throw new Error('Round number is different from previous rounds');

	// Create an array of tables based on an array of players
	const playersTables = tablesFromPlayers(shuffle(activePlayers));

	// For the first round, there's no need to do anything crazy. Just randomly shuffle the players
	if (roundNumber === 0) {
		const round = shuffle(playersTables);
		return { round, score: Score.total(measure(round, playerCount), totalRounds) };
	}

	// If it's not the first round, need to optimise based on the constraints.
	return optimise([...previousRounds, playersTables], playerCount, totalRounds, cb);
}

function optimise(
	rounds: number[][][],
	playerCount: number,
	totalRounds: number,
	cb: CallableFunction | undefined = undefined
) {
	const TEMPERATURE_MIN = 0.001;
	const TEMPERATURE_MAX = RULES[0][2];
	const TEMPERATURE_FACTOR = -Math.log(TEMPERATURE_MAX / TEMPERATURE_MIN);

	const onePercent = Math.floor(ITERATIONS / 100) || 1;

	let temperature = TEMPERATURE_MAX;
	const roundIdx = rounds.length - 1;
	const measures = rounds.map((round) => measure(round, playerCount));

	let score = Score.fastTotal(sumMeasures(measures), totalRounds);
	let previousScore = score;
	let bestScore = score;
	let bestState = structuredClone(rounds[roundIdx]);

	let trials = 0;
	let accepts = 0;
	let improves = 0;

	const globalIndexes = getRoundGlobalIndexes(rounds[roundIdx]);
	const activePlayerCount = rounds[roundIdx].reduce((count, tbl) => {
		return count + tbl.length;
	}, 0);

	for (let iter = 0; iter < ITERATIONS; iter++) {
		temperature = TEMPERATURE_MAX * Math.exp((TEMPERATURE_FACTOR * iter) / ITERATIONS);
		const round = rounds[roundIdx];
		const [i1, i2] = globalIndexes[getRandomInt(0, activePlayerCount)];
		const [j1, j2] = globalIndexes[getRandomInt(0, activePlayerCount)];
		const aux = round[j1][j2];
		round[j1][j2] = round[i1][i2];
		round[i1][i2] = aux;

		// Only recompute the changed round, other rounds have not varied
		const previousMeasure = measures[roundIdx - 1];
		measures[roundIdx] = measure(round, playerCount, previousMeasure, [i1, j1]);
		score = Score.fastTotal(sumMeasures(measures), totalRounds);
		const scoreDiff = score - previousScore;
		trials++;

		// Accept or reject the move depending on its score and temperature
		// The higher temperature, the higher the chance to accept a non-improving move
		if (scoreDiff > 0 && Math.exp(-scoreDiff / temperature) < Math.random()) {
			// Rejects the new iteration. Undo the swap
			const aux = round[j1][j2];
			round[j1][j2] = round[i1][i2];
			round[i1][i2] = aux;

			score = previousScore;
			measures[roundIdx] = previousMeasure;
		} else {
			// Accepts the new iteration
			accepts++;
			previousScore = score;
			if (scoreDiff < 0) {
				improves++;
			}

			if (score < bestScore) {
				bestState = structuredClone(rounds[roundIdx]);
				bestScore = score;
				console.debug('NEW_BEST', bestScore, rounds);
			}
		}

		if (iter % onePercent === 0) {
			if (cb) {
				cb(iter, temperature, score, trials, accepts, improves);
			}

			trials = 0;
			accepts = 0;
			improves = 0;

			rounds[roundIdx] = structuredClone(bestState);
			measures[roundIdx] = measure(rounds[roundIdx], playerCount);
			previousScore = bestScore;
		}
	}

	return { round: bestState, score: Score.total(sumMeasures(measures), totalRounds) };
}

function measure(
	round: number[][],
	playerCount: number,
	previous: IMeasure | undefined = undefined,
	hints: Array<number> | undefined = undefined
): IMeasure {
	let posMatrix: number[][];
	let oppMatrix: number[][][];

	if (previous) {
		posMatrix = structuredClone(previous.posMatrix);
		oppMatrix = structuredClone(previous.oppMatrix);
	} else {
		posMatrix = fast2DMatrix([playerCount, 8], 0);
		oppMatrix = fast3DMatrix([playerCount, playerCount, 8], 0);
	}

	for (let i = 0, iMax = round.length; i < iMax; i++) {
		const table = round[i];
		const tableSize = table.length as 4 | 5;

		if (hints && !hints.includes(i)) continue;

		const seats = range(tableSize);
		for (let seat = 0, seatMax = table.length; seat < seatMax; seat++) {
			const player = table[seat];
			posMatrix[player] = POSITIONS[tableSize][seat];

			if (hints) {
				oppMatrix[player] = fast2DMatrix([playerCount, 8], 0);
			}

			let relation = 0;
			const adjOppMatrix = (seatNum: number) => {
				oppMatrix[player][table[seatNum]] = OPPONENTS[tableSize][relation];
				relation++;
			};

			seats.slice(seat + 1).forEach(adjOppMatrix);
			seats.slice(0, seat).forEach(adjOppMatrix);
		}
	}

	return { posMatrix, oppMatrix };
}

function sumMeasures(measures: IMeasure[]) {
	/** At least 2 measures */
	let sumPos = sum2D(measures[0].posMatrix, measures[1].posMatrix);
	let sumOpp = sum3D(measures[0].oppMatrix, measures[1].oppMatrix);

	for (let i = 2, iMax = measures.length; i < iMax; i++) {
		sumPos = sum2D(sumPos, measures[i].posMatrix);
		sumOpp = sum3D(sumOpp, measures[i].oppMatrix);
	}

	return {
		posMatrix: sumPos,
		oppMatrix: sumOpp
	};
}
