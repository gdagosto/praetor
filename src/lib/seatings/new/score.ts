import { PairMap } from './pairMap';

const stdDevInt = (arr: Uint8Array, avg: number) =>
	Math.sqrt(arr.reduce((sum: number, val: number) => sum + (val - avg) ** 2, 0) / arr.length);

const stdDevFloat = (arr: Float64Array, avg: number) =>
	Math.sqrt(arr.reduce((sum: number, val: number) => sum + (val - avg) ** 2, 0) / arr.length);

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

export class Score {
	rounds: number[][][];
	activePlayers: number[];
	DEBUG: boolean; 
	
	r1: Set<string>;
	r2: PairMap;
	r3: number;
	r4: Set<string>;
	r5: number;

	pairOpponents: PairMap;
	pairPrey: PairMap;
	pairGrandprey: PairMap;
	pairGrandpred: PairMap;
	pairCrosstable: PairMap;

	pairAdjacent: PairMap;
	pairNotAdjacent: PairMap;

	playerSeat: PairMap;
	transfers: Map<number, number>;

	score: number;

	constructor(rounds: number[][][], activePlayers: number[], debug: boolean = false) {
		this.rounds = rounds;
		this.activePlayers = activePlayers;
		this.DEBUG = debug;

		this.score = 0;

		this.r1 = new Set();
		this.r2 = new PairMap();
		this.r3 = 0;
		this.r4 = new Set();
		this.r5 = 0;

		this.pairOpponents = new PairMap();
		this.pairPrey = new PairMap();
		this.pairGrandprey = new PairMap();
		this.pairGrandpred = new PairMap();
		this.pairCrosstable = new PairMap();

		this.pairAdjacent = new PairMap();
		this.pairNotAdjacent = new PairMap();

		this.playerSeat = new PairMap();

		this.transfers = new Map();
	}

	addPairAdjacent(p1: number, p2: number, val: number = 1) {
		// Add pair adjacent twice, for both key pairs
		this.pairAdjacent[p1][p2] += val;
		this.pairAdjacent[p2][p1] += val;

		if (this.pairAdjacent[p1][p2] === 4) {
			if (this.DEBUG) {
				this.R9 +=

			}
			this.score += RULES[8].weight;
		}
	}

	addPairNotAdjacent(p1: number, p2: number, val: number = 1) {
		// Add pair adjacent twice, for both key pairs
		this.pairNotAdjacent[p1][p2] += val;
		this.pairNotAdjacent[p2][p1] += val;

		if (this.pairNotAdjacent[p1][p2] === 4) {
			this.score += RULES[8].weight;
		}
	}

	addPairOpponents(p1: number, p2: number, val: number = 1) {
		this.pairOpponents[p1][p2] += val;
		this.pairOpponents[p2][p1] += val;

		if (this.pairOpponents[p1][p2] === 4) {
			this.score += RULES[3].weight;
		} else if (this.pairOpponents[p1][p2] === 6) {
			this.score += RULES[1].weight;
		}
	}

	addPairPrey(p1: number, p2: number) {
		this.addPairAdjacent(p1, p2, 2);
		this.addPairOpponents(p1, p2, 2);

		this.pairPrey[p1][p2] += 1;

		if (this.pairPrey[p1][p2] === 2) {
			this.score += RULES[0].weight;
		}

		// console.debug('ADD_PAIR_PREY', p1, p2, this.pairOpponents[p1][p2]);
	}

	addPairGrandprey(p1: number, p2: number) {
		this.addPairNotAdjacent(p1, p2, 1);
		this.addPairOpponents(p1, p2, 1);

		this.pairGrandprey[p1][p2] += 1;
		if (this.pairGrandprey[p1][p2] === 2) {
			this.score += RULES[5].weight;
		}

		// console.debug('ADD_PAIR_GRANDPREY', p1, p2, this.pairOpponents[p1][p2]);
	}

	addPairGrandpred(p1: number, p2: number) {
		this.addPairNotAdjacent(p1, p2, 1);
		this.addPairOpponents(p1, p2, 1);

		this.pairGrandpred[p1][p2] += 1;
		if (this.pairGrandpred[p1][p2] === 2) {
			this.score += RULES[5].weight;
		}

		// console.debug('ADD_PAIR_GRANDPRED', p1, p2, this.pairOpponents[p1][p2]);
	}

	addPairCrosstable(p1: number, p2: number) {
		this.addPairNotAdjacent(p1, p2, 2);
		this.addPairOpponents(p1, p2, 2);

		this.pairCrosstable[p1][p2] += 1;
		this.pairCrosstable[p2][p1] += 1;
		if (this.pairCrosstable[p1][p2] === 2) {
			this.score += RULES[5].weight;
		}

		// console.debug('ADD_PAIR_CROSSTABLE', p1, p2, this.pairOpponents[p1][p2]);
	}

	addPlayerSeating(p: number, seating: number) {
		this.playerSeat[p][seating] += 1;

		if (this.playerSeat[p][seating] === 2) {
			if (seating === 5) {
				this.score += RULES[4].weight;
			} else {
				this.score += RULES[6].weight;
			}
		}
	}

	prepare() {
		const availableVps = new Uint8Array(this.activePlayers.length);
		const transfers = new Float64Array(this.activePlayers.length);

		// We only optimise for players currently in the round. Players who dropped out are not considering for scoring

		const numRounds = this.rounds.length;

		for (let i = 0, iMax = numRounds; i < iMax; i++) {
			const round = this.rounds[i];

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
					availableVps[player] += tableLen;
					if (k === 4) {
						transfers[player] += k / numRounds;
					} else {
						transfers[player] += (k + 1) / numRounds;
					}
					this.addPlayerSeating(player, k + 1);
				}
			}
		}

		// R3 - Available VPs are equitably distributed
		const meanVps = availableVps.reduce((total, cur) => total + cur, 0) / this.activePlayers.length;
		const meanTransfers =
			transfers.reduce((total, cur) => total + cur, 0) / this.activePlayers.length;

		const R3 = stdDevInt(availableVps, meanVps);
		const R8 = stdDevFloat(transfers, meanTransfers);

		this.score += RULES[2].weight * R3;
		this.score += RULES[7].weight * R8;
	}
}
