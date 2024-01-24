import { getRandomInt, shuffle } from '$lib/utils';

import { RULES, OPPONENTS, POSITIONS, type IMeasure } from './constants';
import { Score } from './score';
import { fast2DMatrix, fast3DMatrix, range, sum2D, sum3D, getRoundGlobalIndexes } from './utils';

function generatorCallback(
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

export default class SeatingGenerator {
	playerCount: number;
	roundsPerPlayer: number;
	rounds: number[][][];
	currentRound = 0;
	cb = generatorCallback;

	ITERATIONS = 20000;

	constructor(playerCount: number, roundsPerPlayer: number) {
		this.playerCount = playerCount;
		this.roundsPerPlayer = roundsPerPlayer;

		this.rounds = this.getRounds();
	}

	reset() {
		this.rounds = this.getRounds();
	}

	tablesFromPlayers(playerIds: number[]) {
		const len = playerIds.length;

		if ([6, 7, 11].includes(len)) {
			throw new Error(`A staggered round structure is required for ${len} players`);
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

	getRounds() {
		if (this.playerCount < 4) throw new Error('At least 4 players required');
		if (![6, 7, 11].includes(this.playerCount)) {
			const round = this.tablesFromPlayers(range(this.playerCount));
			return [...new Array(this.roundsPerPlayer)].map(() => structuredClone(round));
		}

		if (this.roundsPerPlayer < 2) throw new Error('At least 2 rounds per player');

		/** Number of players you can remove to be able to play */
		const possibleOuts = [];

		const playersPerRound = [4, 5, 4 + 4, 4 + 5, 5 + 5];
		for (let i = 0, iMax = playersPerRound.length; i < iMax; i++) {
			if (this.playerCount <= playersPerRound[i]) break;
			possibleOuts.unshift(this.playerCount - playersPerRound[i]);
		}

		/* Check how many additional rounds we need for everybody to play the required rounds
		 * The way we do it is count the minimum number of times each player has to sit out:
		 *  players:               1 2 3 4 5 6 7
		 * sit out once in round   1 1 2 2 3 3
		 * we have to exclude 2 players per round minimum, but if we have 3 rounds
		 * (counting the additional round), it is ok. If we have more we need more "cycles"
		 * players:                1 2 3 4 5 6 7
		 * sit out once in round   1 1 2 2 3 3 4
		 * sit out twice in round  4
		 * in the next step we adapt the number of sit outs to match the number of players
		 */
		let additionalRounds = 1;
		while (
			possibleOuts[0] * (this.roundsPerPlayer + additionalRounds) >
			this.playerCount * additionalRounds
		) {
			additionalRounds += 1;
		}

		const totalRounds = this.roundsPerPlayer + additionalRounds;
		let excludes = this.playerCount * additionalRounds;
		const out = [];

		/* Compute how many players you exclude for each round:
		 * for each round you must exclude a "possible outs" number,
		 * the total must match exactly  #players * #additional_rounds:
		 * this is a change-making problem, we use the glutton algorithm
		 * but need to be careful about the case when the least number of outs
		 * is not 1, but 2 - luckily in that case, 3 is also authorized.
		 */
		while (excludes) {
			let i = 0;
			while ((totalRounds - out.length) * possibleOuts[i] < excludes) {
				i += 1;
			}

			const excludesMinusOuts = excludes - possibleOuts[i];

			// The first two possibleOuts are always consecutive. Checking the last pair is sufficient
			while (i > 0 && 0 < excludesMinusOuts && excludesMinusOuts < possibleOuts[0]) {
				i -= 1;
			}

			out.push(possibleOuts[i]);
			excludes -= possibleOuts[i];
		}

		const exclusions = out.reduce(
			(obj, currNum, idx) => {
				obj.push(...new Array(currNum).fill(idx));
				return obj;
			},
			<number[]>[]
		);

		const rounds: number[][] = [];

		for (let i = 0; i < totalRounds; i++) {
			const round = [];
			for (let p = 0; p < this.playerCount; p++) {
				if (exclusions[p] === i) continue;
				round.push(p);
			}
			rounds.push(round);
		}

		// Shuffle players around for the first round
		rounds[0] = shuffle(rounds[0]);

		return rounds.map((round) => this.tablesFromPlayers(round));
	}

	generateNextRound(nextRound = true, cb = true) {
		/** Generates seatings for the next round */
		if (nextRound) {
			this.currentRound += 1;
		}

		return this.generateRoundSeatings(this.currentRound, cb);
	}

	generateRoundSeatings(roundNumber: number, cb = true) {
		console.log(`Generating round seats for Round ${roundNumber}`);

		if (roundNumber === 1) {
			this.rounds[0] = shuffle(this.rounds[0]);
			return { round: this.rounds[0], score: Score.total(this.measure(this.rounds[0])) };
		}

		const { round, score } = this.optimise(
			this.rounds.slice(0, roundNumber),
			cb ? this.cb : undefined
		);

		this.rounds[roundNumber - 1] = round;

		return { round, score };
	}

	optimise(rounds: number[][][], cb: CallableFunction | undefined = undefined) {
		const { ITERATIONS } = this;
		const TEMPERATURE_MIN = 0.001;
		const TEMPERATURE_MAX = RULES[0][2];
		const TEMPERATURE_FACTOR = -Math.log(TEMPERATURE_MAX / TEMPERATURE_MIN);

		const onePercent = Math.floor(ITERATIONS / 100) || 1;

		let temperature = TEMPERATURE_MAX;
		const roundIdx = rounds.length - 1;
		const measures = rounds.map((round) => this.measure(round));

		let score = Score.fastTotal(this.sumMeasures(measures));
		let previousScore = score;
		let bestScore = score;
		let bestState = structuredClone(rounds[roundIdx]);

		// Shuffle the last round
		shuffle(rounds[roundIdx]);

		let trials = 0;
		let accepts = 0;
		let improves = 0;

		const globalIndexes = getRoundGlobalIndexes(rounds[roundIdx]);
		const playerCount = rounds[roundIdx].reduce((count, tbl) => {
			return count + tbl.length;
		}, 0);

		for (let iter = 0; iter < ITERATIONS; iter++) {
			temperature = TEMPERATURE_MAX * Math.exp((TEMPERATURE_FACTOR * iter) / ITERATIONS);
			const round = rounds[roundIdx];
			const [i1, i2] = globalIndexes[getRandomInt(0, playerCount)];
			const [j1, j2] = globalIndexes[getRandomInt(0, playerCount)];
			const aux = round[j1][j2];
			round[j1][j2] = round[i1][i2];
			round[i1][i2] = aux;

			// Only recompute the changed round, other rounds have not varied
			const previousMeasure = measures[roundIdx];
			measures[roundIdx] = this.measure(round, previousMeasure, [i1, j1]);
			score = Score.fastTotal(this.sumMeasures(measures));
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
				measures[roundIdx] = this.measure(rounds[roundIdx]);
				previousScore = bestScore;
			}
		}

		return { round: bestState, score: Score.total(this.sumMeasures(measures)) };
	}

	measure(
		round: number[][],
		previous: IMeasure | undefined = undefined,
		hints: Array<number> | undefined = undefined
	): IMeasure {
		let posMatrix: number[][];
		let oppMatrix: number[][][];

		if (previous) {
			posMatrix = structuredClone(previous.posMatrix);
			oppMatrix = structuredClone(previous.oppMatrix);
		} else {
			posMatrix = fast2DMatrix([this.playerCount, 8], 0);
			oppMatrix = fast3DMatrix([this.playerCount, this.playerCount, 8], 0);
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
					oppMatrix[player] = fast2DMatrix([this.playerCount, 8], 0);
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

	sumMeasures(measures: IMeasure[]) {
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
}
