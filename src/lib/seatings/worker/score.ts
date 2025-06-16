import { PairMap } from './pairMap.js';

const stdDevInt = (arr: Uint8Array, avg: number) =>
	Math.sqrt(arr.reduce((sum: number, val: number) => sum + (val - avg) ** 2, 0) / arr.length);

const stdDevTransfers = (arr: Uint8Array, avg: number, numRounds: number) =>
	Math.sqrt(
		arr.reduce((sum: number, val: number) => sum + (val / numRounds - avg) ** 2, 0) / arr.length
	);

/** RULES
 * R1 No pair of players repeat their predator-prey relationship. This is mandatory.
 * R2 No pair of players share a table through all three rounds, when possible.
 * R3 Available VPs are equitably distributed.
 * R4 No pair of players share a table more often than necessary.
 * R5 A player doesn't sit in the fifth seat more than once.
 * R6 No pair of players repeat the same relative position[*], when possible.
 * R7 A player doesn't play in the same seat position, if possible.
 * R8 Starting transfers are equitably distributed.
 * R9 No pair of players repeat the same relative position group[^], when possible.
 *
 * [*] "relative position" relationship values:
 * 1) prey
 * 2) predator
 * 3) grand-prey at a 5
 * 4) grand-predator at a 5
 * 5) cross-table at a 4-player
 * Note that repeating 1 and repeating 2 is already handled (prohibited) by R1.
 *
 * [^] "relative position group" values:
 * 1) Adjacent (prey or predator)
 * 2) Not adjacent
 *
 * The matching attributes of the instance provide a list of violations for each rule,
 * except for rules R3 and R8, simply indicating the standard deviation of the value.
 * For those rules, player by player violations (too far away from mean) are listed
 * in the `vps` and `transfers` attributes and the mean values in `mean_vps` and
 * `mean_tranfers`.
 */

export const RULES = [
	{ code: 'R1', label: 'predator-prey', weight: 10 ** 12 },
	{ code: 'R2', label: 'opponent thrice', weight: 10 ** 9 },
	{ code: 'R3', label: 'available vps', weight: 10 ** 8 },
	{ code: 'R4', label: 'opponent twice', weight: 10 ** 6 },
	{ code: 'R5', label: 'fifth seat', weight: 10 ** 5 },
	{ code: 'R6', label: 'position', weight: 10 ** 4 },
	{ code: 'R7', label: 'same seat', weight: 10 ** 3 },
	{ code: 'R8', label: 'starting transfers', weight: 10 ** 2 },
	{ code: 'R9', label: 'position group', weight: 1 }
] as const;

type IRule1 = [number, number][];
type IRule2 = [number, number][];
type IRule3 = number;
type IRule4 = [number, number][];
type IRule5 = [number, number][];
type IRule6 = [number, number][];
type IRule7 = [number, number][];
type IRule8 = number;
type IRule9 = [number, number, number][];

type IRules = [IRule1, IRule2, IRule3, IRule4, IRule5, IRule6, IRule7, IRule8, IRule9];

export class Score {
	rounds: number[][][];
	playerCount: number;
	DEBUG: boolean;

	rules: IRules;

	pairOpponents: PairMap;
	pairPrey: PairMap;
	pairGrandprey: PairMap;
	pairGrandpred: PairMap;
	pairCrosstable: PairMap;

	pairAdjacent: PairMap;
	pairNotAdjacent: PairMap;

	playerSeat: PairMap;

	availableVps: Uint8Array;
	transfers: Uint8Array;

	total: number;

	constructor(rounds: number[][][], playerCount: number, debug: boolean = false, calculate = true) {
		this.rounds = rounds;
		this.playerCount = playerCount;
		this.DEBUG = debug;

		this.total = 0;
		this.rules = [[], [], 0, [], [], [], [], 0, []];

		this.pairOpponents = new PairMap();
		this.pairPrey = new PairMap();
		this.pairGrandprey = new PairMap();
		this.pairGrandpred = new PairMap();
		this.pairCrosstable = new PairMap();

		this.pairAdjacent = new PairMap();
		this.pairNotAdjacent = new PairMap();

		this.playerSeat = new PairMap();

		this.availableVps = new Uint8Array(this.playerCount);
		this.transfers = new Uint8Array(this.playerCount);

		if (calculate) this.prepare();
	}

	addPairAdjacent(p1: number, p2: number, val: number = 1) {
		// Add pair adjacent twice, for both key pairs
		this.pairAdjacent[p1][p2] += val;
		this.pairAdjacent[p2][p1] += val;

		if (this.pairAdjacent[p1][p2] === 4) {
			if (this.DEBUG) this.rules[8].push([p1, p2, 1]);
			this.total += RULES[8].weight;
		}
	}

	addPairNotAdjacent(p1: number, p2: number, val: number = 1) {
		// Add pair adjacent twice, for both key pairs
		this.pairNotAdjacent[p1][p2] += val;
		this.pairNotAdjacent[p2][p1] += val;

		if (this.pairNotAdjacent[p1][p2] === 4) {
			if (this.DEBUG) this.rules[8].push([p1, p2, 2]);
			this.total += RULES[8].weight;
		}
	}

	addPairOpponents(p1: number, p2: number, val: number = 1) {
		this.pairOpponents[p1][p2] += val;
		this.pairOpponents[p2][p1] += val;

		if (this.pairOpponents[p1][p2] === 4) {
			if (this.DEBUG) this.rules[3].push([p1, p2]);
			this.total += RULES[3].weight;
		} else if (this.pairOpponents[p1][p2] === 6) {
			if (this.DEBUG) this.rules[1].push([p1, p2]);
			this.total += RULES[1].weight;
		}
	}

	addPairPrey(p1: number, p2: number) {
		this.addPairAdjacent(p1, p2, 2);
		this.addPairOpponents(p1, p2, 2);

		this.pairPrey[p1][p2] += 1;

		if (this.pairPrey[p1][p2] === 2) {
			if (this.DEBUG) this.rules[0].push([p1, p2]);
			this.total += RULES[0].weight;
		}

		// console.debug('ADD_PAIR_PREY', p1, p2, this.pairOpponents[p1][p2]);
	}

	addPairGrandprey(p1: number, p2: number) {
		this.addPairNotAdjacent(p1, p2, 1);
		this.addPairOpponents(p1, p2, 1);

		this.pairGrandprey[p1][p2] += 1;
		if (this.pairGrandprey[p1][p2] === 2) {
			if (this.DEBUG) this.rules[5].push([p1, p2]);
			this.total += RULES[5].weight;
		}

		// console.debug('ADD_PAIR_GRANDPREY', p1, p2, this.pairOpponents[p1][p2]);
	}

	addPairGrandpred(p1: number, p2: number) {
		this.addPairNotAdjacent(p1, p2, 1);
		this.addPairOpponents(p1, p2, 1);

		this.pairGrandpred[p1][p2] += 1;
		if (this.pairGrandpred[p1][p2] === 2) {
			if (this.DEBUG) this.rules[5].push([p1, p2]);
			this.total += RULES[5].weight;
		}

		// console.debug('ADD_PAIR_GRANDPRED', p1, p2, this.pairOpponents[p1][p2]);
	}

	addPairCrosstable(p1: number, p2: number) {
		this.addPairNotAdjacent(p1, p2, 2);
		this.addPairOpponents(p1, p2, 2);

		this.pairCrosstable[p1][p2] += 1;
		this.pairCrosstable[p2][p1] += 1;
		if (this.pairCrosstable[p1][p2] === 2) {
			if (this.DEBUG) this.rules[5].push([p1, p2]);
			this.total += RULES[5].weight;
		}

		// console.debug('ADD_PAIR_CROSSTABLE', p1, p2, this.pairOpponents[p1][p2]);
	}

	addPlayerSeating(p: number, seating: number) {
		this.playerSeat[p][seating] += 1;

		if (this.playerSeat[p][seating] === 2) {
			if (seating === 5) {
				if (this.DEBUG) this.rules[4].push([p, seating]);
				this.total += RULES[4].weight;
			} else {
				if (this.DEBUG) this.rules[6].push([p, seating]);
				this.total += RULES[6].weight;
			}
		}
	}

	calculateRound(round: number[][]) {
		for (let j = 0, jMax = round.length; j < jMax; j++) {
			const table = round[j];
			const tableLen = table.length;

			// Add the preyPred relationships
			if (tableLen === 5) {
				// TABLE LENGTH = 5
				this.addPairPrey(table[0], table[1]);
				this.addPairPrey(table[1], table[2]);
				this.addPairPrey(table[2], table[3]);
				this.addPairPrey(table[3], table[4]);
				this.addPairPrey(table[4], table[0]);

				this.addPairGrandprey(table[0], table[2]);
				this.addPairGrandprey(table[1], table[3]);
				this.addPairGrandprey(table[2], table[4]);
				this.addPairGrandprey(table[3], table[0]);
				this.addPairGrandprey(table[4], table[1]);

				this.addPairGrandpred(table[0], table[3]);
				this.addPairGrandpred(table[1], table[4]);
				this.addPairGrandpred(table[2], table[0]);
				this.addPairGrandpred(table[3], table[1]);
				this.addPairGrandpred(table[4], table[2]);
			} else {
				// TABLE LENGTH = 4
				this.addPairPrey(table[0], table[1]);
				this.addPairPrey(table[1], table[2]);
				this.addPairPrey(table[2], table[3]);
				this.addPairPrey(table[3], table[0]);

				this.addPairCrosstable(table[0], table[2]);
				this.addPairCrosstable(table[1], table[3]);
				this.addPairCrosstable(table[2], table[0]);
				this.addPairCrosstable(table[3], table[1]);
			}

			for (let k = 0, kMax = tableLen; k < kMax; k++) {
				const player = table[k];
				this.availableVps[player] += tableLen;
				if (k === 4) {
					this.transfers[player] += k;
				} else {
					this.transfers[player] += k + 1;
				}
				this.addPlayerSeating(player, k + 1);
			}
		}
	}

	prepare() {
		const numRounds = this.rounds.length;

		for (let i = 0, iMax = this.rounds.length; i < iMax; i++) {
			this.calculateRound(this.rounds[i]);
		}

		// R3 - Available VPs are equitably distributed
		const meanVps = this.availableVps.reduce((total, cur) => total + cur, 0) / this.playerCount;
		const meanTransfers =
			this.transfers.reduce((total, cur) => total + cur / numRounds, 0) / this.playerCount;

		const R3 = stdDevInt(this.availableVps, meanVps);
		const R8 = stdDevTransfers(this.transfers, meanTransfers, numRounds);

		if (this.DEBUG) {
			this.rules[2] += R3;
			this.rules[7] += R8;
		}
		this.total += RULES[2].weight * R3;
		this.total += RULES[7].weight * R8;
	}

	nextRound(round: number[][], playerCount: number) {
		// Given that a score is already calculated, return a new score instance, with the previous rounds already calculated
		const nextRoundScore = new Score([...this.rounds, round], playerCount, this.DEBUG, false);
		nextRoundScore.rules = this.rules;
		nextRoundScore.total = this.total;
		nextRoundScore.pairAdjacent = this.pairAdjacent;
		nextRoundScore.pairCrosstable = this.pairCrosstable;
		nextRoundScore.pairGrandpred = this.pairGrandpred;
		nextRoundScore.pairGrandprey = this.pairGrandprey;
		nextRoundScore.pairNotAdjacent = this.pairNotAdjacent;
		nextRoundScore.pairOpponents = this.pairOpponents;
		nextRoundScore.pairPrey = this.pairPrey;
		nextRoundScore.playerSeat = this.playerSeat;
		nextRoundScore.transfers = this.transfers;
		nextRoundScore.availableVps = this.availableVps;
		nextRoundScore.playerCount = playerCount;
		nextRoundScore.calculateRound(round);

		return nextRoundScore;
	}
}
