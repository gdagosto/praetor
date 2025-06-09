import { playerMapping } from './utils';

type Round = Player[][];
type Player = number;
type PlayerMapping = Map<number, number>;

// Violations objects listed by Score
type PlayerViolation = Player;
type PairViolation = [Player, Player];
type PositionViolation = [Player, Player, number];
type SeatViolation = [Player, number];
type Deviation = [Player, number];

const OPPONENTS_MATRICES = {
	4: [
		[1, 1, 0, 0, 0, 0, 1, 0],
		[1, 0, 0, 0, 0, 1, 0, 1],
		[1, 0, 0, 0, 1, 0, 1, 0]
	],
	5: [
		[1, 1, 0, 0, 0, 0, 1, 0],
		[1, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 0, 1, 0]
	]
};

const POSITIONS_MATRICES = {
	4: [
		[1, 4, 1, 1, 0, 0, 0, 0],
		[1, 4, 2, 0, 1, 0, 0, 0],
		[1, 4, 3, 0, 0, 1, 0, 0],
		[1, 4, 4, 0, 0, 0, 1, 0]
	],
	5: [
		[1, 5, 1, 1, 0, 0, 0, 0],
		[1, 5, 2, 0, 1, 0, 0, 0],
		[1, 5, 3, 0, 0, 1, 0, 0],
		[1, 5, 4, 0, 0, 0, 1, 0],
		[1, 5, 4, 0, 0, 0, 0, 1]
	]
};

export const RULES = [
	{ code: 'R1', label: 'predator-prey', weight: 10 ** 10 },
	{ code: 'R2', label: 'opponent thrice', weight: 10 ** 9 },
	{ code: 'R3', label: 'available vps', weight: 10 ** 8 },
	{ code: 'R4', label: 'opponent twice', weight: 10 ** 6 },
	{ code: 'R5', label: 'fifth seat', weight: 10 ** 5 },
	{ code: 'R6', label: 'position', weight: 10 ** 4 },
	{ code: 'R7', label: 'same seat', weight: 10 ** 3 },
	{ code: 'R8', label: 'starting transfers', weight: 10 ** 2 },
	{ code: 'R9', label: 'position group', weight: 1 }
] as const;

// Using type aliases for named tuples
type Measure = {
	position: number[][]; // players_count x 8
	opponents: number[][][]; // players_count x players_count x 8
};

// Helper for Measure addition, will be implemented as a function
export function addMeasures(lhs: Measure, rhs: Measure): Measure {
	const newPosition = lhs.position.map((row, i) => row.map((val, j) => val + rhs.position[i][j]));

	const newOpponents = lhs.opponents.map((player1Rows, i) =>
		player1Rows.map((player2Cols, j) => player2Cols.map((val, k) => val + rhs.opponents[i][j][k]))
	);
	return { position: newPosition, opponents: newOpponents };
}

export function measure(
	pm: PlayerMapping,
	round: Round,
	previous?: Measure,
	hints?: number[]
): Measure {
	const lenPm = pm.size;
	let position: number[][];
	let opponents: number[][][];

	if (previous) {
		// Deep copy
		position = previous.position.map((row) => [...row]);
		opponents = previous.opponents.map((p1) => p1.map((p2) => [...p2]));
	} else {
		position = Array(lenPm)
			.fill(0)
			.map(() => Array(8).fill(0));
		opponents = Array(lenPm)
			.fill(0)
			.map(() =>
				Array(lenPm)
					.fill(0)
					.map(() => Array(8).fill(0))
			);
	}

	for (let tableIndex = 0; tableIndex < round.length; tableIndex++) {
		if (hints && !hints.includes(tableIndex)) {
			continue;
		}

		const table = round[tableIndex];
		const tableSize = table.length;

		for (let seat = 0; seat < tableSize; seat++) {
			const player = table[seat];
			const playerIdx = pm.get(player)!;

			// Update position matrix
			position[playerIdx] = [
				...POSITIONS_MATRICES[tableSize as keyof typeof POSITIONS_MATRICES][seat]
			];

			// If hints are provided, clear previous opponent data for this player
			// because we're going to recompute it.
			if (hints !== undefined) {
				for (let j = 0; j < lenPm; j++) {
					opponents[playerIdx][j].fill(0);
				}
			}

			// Update opponents matrix
			const seatedOpponents = [...table.slice(seat + 1), ...table.slice(0, seat)];
			for (let relation = 0; relation < seatedOpponents.length; relation++) {
				const opponent = seatedOpponents[relation];
				const opponentIdx = pm.get(opponent)!;
				opponents[playerIdx][opponentIdx] = [
					...OPPONENTS_MATRICES[tableSize as keyof typeof POSITIONS_MATRICES][relation]
				];
			}
		}
	}
	return { position, opponents };
}

export class Score {
	// Public properties for each rule and aggregated scores
	R1: PairViolation[];
	R2: PairViolation[];
	R3: number; // Standard deviation
	R4: PairViolation[];
	R5: PlayerViolation[];
	R6: PositionViolation[];
	R7: SeatViolation[];
	R8: number; // Standard deviation
	R9: PositionViolation[];

	mean_vps: number;
	mean_transfers: number;
	vps: Deviation[];
	transfers: Deviation[];
	rules: number[];
	total: number;

	constructor(rounds: Round[], pm: PlayerMapping | null = null) {
		pm = pm || playerMapping(rounds);

		let roundsCount = rounds.length;

		const totalMeasure = rounds.reduce(
			(acc, r) => {
				const m = measure(pm!, r);
				return acc ? addMeasures(acc, m) : m;
			},
			null as Measure | null
		)!;

		// scoreMeasure
		// this.scoreMeasure(totalMeasure, rounds.length, pm);
		// private scoreMeasure(measure: Measure, roundsCount: number, pm: PlayerMapping): void {
		const rpm = new Map<number, Player>();
		pm.forEach((val, key) => rpm.set(val, key));

		const playing: number[] = totalMeasure.position.map((row) => row[0]); // Column 0: played
		const playingFilter: boolean[] = playing.map((val) => val > 0);

		const vps: number[] = [];
		const transfers: number[] = [];

		for (let i = 0; i < playing.length; i++) {
			if (playingFilter[i]) {
				vps.push(totalMeasure.position[i][1] / playing[i]); // Column 1: VPs
				transfers.push(totalMeasure.position[i][2] / playing[i]); // Column 2: Transfers
			}
		}

		const mean = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0) / arr.length;
		const stdDev = (arr: number[], avg: number) =>
			Math.sqrt(arr.reduce((sum, val) => sum + (val - avg) ** 2, 0) / arr.length);

		this.mean_vps = mean(vps);
		this.mean_transfers = mean(transfers);

		this.R3 = stdDev(vps, this.mean_vps);
		this.R8 = stdDev(transfers, this.mean_transfers);

		this.vps = [];
		this.transfers = [];
		for (let i = 0; i < playing.length; i++) {
			if (playingFilter[i]) {
				const player = rpm.get(i)!;
				const playerVps = totalMeasure.position[i][1] / playing[i];
				if (Math.abs(this.mean_vps - playerVps) > 1 / roundsCount) {
					this.vps.push([player, playerVps]);
				}
				const playerTransfers = totalMeasure.position[i][2] / playing[i];
				if (Math.abs(this.mean_transfers - playerTransfers) > 1 / roundsCount) {
					this.transfers.push([player, playerTransfers]);
				}
			}
		}

		// R7: Same seat twice (or more)
		this.R7 = [];
		for (let i = 0; i < totalMeasure.position.length; i++) {
			for (let j = 3; j < 8; j++) {
				// Seat columns (seat1 to seat5)
				if (totalMeasure.position[i][j] > 1) {
					this.R7.push([rpm.get(i)!, j - 3 + 1]);
				}
			}
		}

		// R5: Fifth seat twice (or more)
		this.R5 = this.R7.filter((violation) => violation[1] === 5).map((v) => v[0]);

		// R4: Opponent twice (or more)
		this.R4 = [];
		for (let i = 0; i < totalMeasure.opponents.length; i++) {
			for (let j = i + 1; j < totalMeasure.opponents[i].length; j++) {
				if (totalMeasure.opponents[i][j][0] > 1) {
					// Opponent (index 0 in opponent relations)
					this.R4.push([rpm.get(i)!, rpm.get(j)!]);
				}
			}
		}

		// R2: Opponent on all rounds
		this.R2 = [];
		for (let i = 0; i < totalMeasure.opponents.length; i++) {
			for (let j = i + 1; j < totalMeasure.opponents[i].length; j++) {
				if (totalMeasure.opponents[i][j][0] >= roundsCount) {
					// Opponent (index 0)
					this.R2.push([rpm.get(i)!, rpm.get(j)!]);
				}
			}
		}

		// R6: Same position twice (or more)
		this.R6 = [];
		for (let i = 0; i < totalMeasure.opponents.length; i++) {
			for (let j = i + 1; j < totalMeasure.opponents[i].length; j++) {
				for (let p = 1; p < 6; p++) {
					// Relative positions (indices 1 to 5)
					if (totalMeasure.opponents[i][j][p] > 1) {
						this.R6.push([rpm.get(i)!, rpm.get(j)!, p]);
					}
				}
			}
		}

		// R1: Predator-prey twice (or more) - derived from R6
		this.R1 = this.R6.filter((v) => [1, 4].includes(v[2])).map((v) => [v[0], v[1]]);

		// R9: Same position group twice (or more)
		this.R9 = [];
		for (let i = 0; i < totalMeasure.opponents.length; i++) {
			for (let j = i + 1; j < totalMeasure.opponents[i].length; j++) {
				for (let g = 6; g < 8; g++) {
					// Position groups (indices 6 to 7)
					if (totalMeasure.opponents[i][j][g] > 1) {
						this.R9.push([rpm.get(i)!, rpm.get(j)!, g - 5]);
					}
				}
			}
		}

		this.rules = RULES.map((rule) => {
			switch (rule.code) {
				case 'R3':
				case 'R8':
					return this[rule.code];
				default:
					return this[rule.code].length;
			}
		});

		this.total = this.rules.reduce(
			(sum, ruleValue, index) => sum + (ruleValue as number) * RULES[index].weight,
			0
		);
	}

	toString(): string {
		const points = this.rules.map((s) => s.toFixed(2));
		return `Score: [${points.join(', ')}]`;
	}

	static fastTotal(measure: Measure, roundsCount: number): number {
		const playing = measure.position.map((row) => row[0]); // Column 0: played
		const playingFilter = playing.map((val) => val > 0);

		const vps: number[] = [];
		const transfers: number[] = [];
		for (let i = 0; i < playing.length; i++) {
			if (playingFilter[i]) {
				vps.push(measure.position[i][1] / playing[i]);
				transfers.push(measure.position[i][2] / playing[i]);
			}
		}

		const mean = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0) / arr.length;

		let rulesValues: number[] = Array(RULES.length).fill(0);

		// R1, R2, R4, R6, R9 involve measure.opponents
		let collisions = false;
		// Pre-calculate common opponent data for optimization
		const opponentsTwice: number[][] = [];
		for (let i = 0; i < measure.opponents.length; i++) {
			for (let j = i + 1; j < measure.opponents[i].length; j++) {
				if (measure.opponents[i][j][0] > 0) {
					// If they were opponents at least once
					collisions = true;
				}
				if (measure.opponents[i][j][0] > 1) {
					// If they were opponents more than once
					opponentsTwice.push(measure.opponents[i][j]);
				}
			}
		}

		// R1: same predator-prey relationship
		rulesValues[0] = opponentsTwice.filter((pair) => pair[1] > 1 || pair[4] > 1).length;

		// R2: opponents more than twice
		rulesValues[1] = opponentsTwice.filter((pair) => pair[0] >= roundsCount).length;

		// R3: VPs difference
		const meanVps = mean(vps);
		rulesValues[2] = vps.reduce((sum, val) => sum + (val - meanVps) ** 2, 0) / vps.length;

		// R4: opponents more than once (already handled by opponentsTwice, but we just need count)
		// The original Python has `numpy.count_nonzero(opponents_twice[:, 0]) // 2`
		// which effectively counts pairs where they met more than once.
		rulesValues[3] = opponentsTwice.length; // Each entry in opponentsTwice represents a pair that met >1

		// R5: fifth seat more than once
		rulesValues[4] = measure.position.filter((row) => row[7] > 1).length; // Column 7 is seat5

		// R6: same opponent relationship more than once
		rulesValues[5] = opponentsTwice.filter(
			(pair) => pair[1] > 1 || pair[2] > 1 || pair[3] > 1 || pair[4] > 1 || pair[5] > 1
		).length;

		// R7: same table seat more than once
		rulesValues[6] = measure.position.filter(
			(row) => row[3] > 1 || row[4] > 1 || row[5] > 1 || row[6] > 1 || row[7] > 1
		).length;

		// R8: Transfers difference
		const meanTransfers = mean(transfers);
		rulesValues[7] =
			transfers.reduce((sum, val) => sum + (val - meanTransfers) ** 2, 0) / transfers.length;

		// R9: same position groups for an opponent twice
		rulesValues[8] = opponentsTwice.filter((pair) => pair[6] > 1 || pair[7] > 1).length;

		let totalScore = 0;
		for (let i = 0; i < RULES.length; i++) {
			totalScore += rulesValues[i] * RULES[i].weight;
		}
		return totalScore;
	}
}
