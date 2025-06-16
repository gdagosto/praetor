import { ITERATIONS, RULES } from './constants';
import { Score } from './score';
import { getRandomInt, getRoundGlobalIndexes, shuffle } from './utils';

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

	if (len < 4) throw new Error('Cant run a tournament without at least 4 players');

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
	cb: IGeneratorCallback | null = exampleGeneratorCb
): { round: number[][]; score: Score } {
	console.debug('GENERATE_ROUND | roundNumber', roundNumber);
	console.debug('GENERATE_ROUND | previousRounds', previousRounds);
	console.debug('GENERATE_ROUND | activePlayers', activePlayers);
	console.debug('GENERATE_ROUND | playerCount', playerCount);
	console.debug('GENERATE_ROUND | cb', cb);

	if (previousRounds.length !== roundNumber)
		throw new Error('Round number is different from previous rounds');

	// Create an array of tables based on an array of players
	const playersTables = tablesFromPlayers(shuffle(activePlayers));

	// For the first round, there's no need to do anything crazy. Just randomly shuffle the players
	if (roundNumber === 0) {
		const round = shuffle(playersTables);

		const finalScore = new Score([round], playerCount);

		return { round, score: finalScore };
	}

	// If it's not the first round, need to optimise based on the constraints.
	return optimise([...previousRounds, playersTables], playerCount, totalRounds, cb);
}

function optimise(
	rounds: number[][][],
	playerCount: number,
	totalRounds: number,
	cb: CallableFunction | null = null
) {
	const TEMPERATURE_MIN = 0.001;
	const TEMPERATURE_MAX = RULES[0][2];
	const TEMPERATURE_FACTOR = -Math.log(TEMPERATURE_MAX / TEMPERATURE_MIN);

	const onePercent = Math.floor(ITERATIONS / 100) || 1;

	let temperature = TEMPERATURE_MAX;
	const roundIdx = rounds.length - 1;

	let score = new Score(rounds, playerCount).total;
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

		score = new Score(rounds, playerCount).total;
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
			previousScore = bestScore;
		}
	}

	const finalScore = new Score(rounds, playerCount, true);

	return { round: bestState, score: finalScore };
}
