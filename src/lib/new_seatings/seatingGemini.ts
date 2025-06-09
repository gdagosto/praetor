import * as os from 'os';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

// The seating rules: code, label, weight
// weights are devised so that major rules always prevail over minor rules.
// stddev rules (R3, R8) need a factor of 100 over the next one to prevail.
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

export type Player = Hashable; // Assuming Player can be any hashable type

/**
 * A list of list representing the tables of a round
 */
export class Round {
	tables: Player[][];

	constructor(tables: Player[][]) {
		this.tables = tables;
	}

	static fromPlayers(players: Player[]): Round {
		const length = players.length;
		if ([6, 7, 11].includes(length)) {
			throw new Error(`A staggered round structure is required for ${length} players`);
		}

		const fours = 5 - (length % 5 || 5);
		const fives = (length - 4 * fours) / 5;

		const newTables: Player[][] = [];
		let playerIndex = 0;

		for (let i = 0; i < fives; i++) {
			newTables.push(players.slice(playerIndex, playerIndex + 5));
			playerIndex += 5;
		}
		for (let i = 0; i < fours; i++) {
			newTables.push(players.slice(playerIndex, playerIndex + 4));
			playerIndex += 4;
		}
		return new Round(newTables);
	}

	static copy(round: Round): Round {
		return new Round(round.tables.map((t) => [...t]));
	}

	shuffle(): void {
		const players = Array.from(this.iterPlayers());
		// Fisher-Yates shuffle
		for (let i = players.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[players[i], players[j]] = [players[j], players[i]];
		}
		let playerIndex = 0;
		for (let i = 0; i < this.tables.length; i++) {
			for (let j = 0; j < this.tables[i].length; j++) {
				this.tables[i][j] = players[playerIndex];
				playerIndex++;
			}
		}
	}

	*iterTablePlayers(): Iterable<[number, number, number, Player]> {
		for (let tableNumber = 0; tableNumber < this.tables.length; tableNumber++) {
			const players = this.tables[tableNumber];
			const tableSize = players.length;
			for (let position = 0; position < tableSize; position++) {
				yield [tableNumber + 1, position + 1, tableSize, players[position]];
			}
		}
	}

	*iterTables(): Iterable<Player[]> {
		yield* this.tables;
	}

	*iterPlayers(): Iterable<Player> {
		for (const table of this.tables) {
			yield* table;
		}
	}

	tablesCount(): number {
		return this.tables.length;
	}

	playersCount(): number {
		return this.tables.reduce((sum, table) => sum + table.length, 0);
	}

	_globalIndexes(): Map<number, [number, number]> {
		const indexes = new Map<number, [number, number]>();
		let globalIndex = 0;
		for (let i = 0; i < this.tables.length; i++) {
			for (let j = 0; j < this.tables[i].length; j++) {
				indexes.set(globalIndex, [i, j]);
				globalIndex++;
			}
		}
		return indexes;
	}

	private __globalIndexToTuple(index: number): [number, number] {
		let tableIndex = 0;
		let currentIndex = index;
		for (let i = 0; i < this.tables.length; i++) {
			if (currentIndex >= this.tables[i].length) {
				currentIndex -= this.tables[i].length;
				tableIndex++;
			} else {
				return [tableIndex, currentIndex];
			}
		}
		throw new Error('Index out of bounds');
	}

	getTable(index: number): Player[] {
		return this.tables[index];
	}

	setTable(index: number, value: Player[]): void {
		this.tables[index] = value;
	}

	getPlayer(index: number): Player {
		const [i, j] = this.__globalIndexToTuple(index);
		return this.tables[i][j];
	}

	setPlayer(index: number, value: Player): void {
		const [i, j] = this.__globalIndexToTuple(index);
		this.tables[i][j] = value;
	}
}

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

export type PlayerMapping = Map<Hashable, number>;
type Hashable = string | number; // Assuming players are strings or numbers for simplicity

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

export function playerMapping(rounds: Round[]): PlayerMapping {
	const mapping = new Map<Hashable, number>();
	let number = 0;
	for (const round of rounds) {
		for (const player of round.iterPlayers()) {
			if (!mapping.has(player)) {
				mapping.set(player, number);
				number++;
			}
		}
	}
	return mapping;
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

	for (let tableIndex = 0; tableIndex < round.tablesCount(); tableIndex++) {
		if (hints && !hints.includes(tableIndex)) {
			continue;
		}

		const table = round.getTable(tableIndex);
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

// Violations objects listed by Score
type PlayerViolation = Player;
type PairViolation = [Player, Player];
type PositionViolation = [Player, Player, number];
type SeatViolation = [Player, number];
type Deviation = [Player, number];

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

export function getRounds(players: Player[], roundsCount: number): Round[] {
	const playersCount = players.length;
	if (playersCount < 4) {
		throw new Error('At least 4 players required');
	}

	if (![6, 7, 11].includes(playersCount)) {
		return Array(roundsCount)
			.fill(0)
			.map(() => Round.fromPlayers([...players]));
	}

	if (roundsCount < 2) {
		throw new Error('At least 2 rounds by player are required');
	}

	// number of players you can remove to be able to play
	const possibleOuts: number[] = [];
	for (const i of [4, 5, 4 + 4, 4 + 5, 5 + 5]) {
		if (playersCount <= i) {
			break;
		}
		possibleOuts.unshift(playersCount - i);
	}
	console.log('POSSIBLE_OUTS', possibleOuts);

	let additionalRounds = 1;
	while (possibleOuts[0] * (roundsCount + additionalRounds) > playersCount * additionalRounds) {
		additionalRounds++;
	}

	const totalRounds = roundsCount + additionalRounds;
	let excludesTotal = playersCount * additionalRounds;
	const out: number[] = [];

	while (excludesTotal > 0) {
		let i = 0;
		while ((totalRounds - out.length) * possibleOuts[i] < excludesTotal) {
			i++;
		}
		while (i > 0 && excludesTotal - possibleOuts[i] < possibleOuts[0]) {
			i--;
		}
		out.push(possibleOuts[i]);
		excludesTotal -= possibleOuts[i];
	}

	// Trying manually
	const exclusions = [];

	for (let i = 0, iMax = totalRounds; i < iMax; i++) {
		const outVal = out[i];
		for (let j = 0, jMax = outVal; j < jMax; j++) {
			exclusions.push(i);
		}
	}

	console.log('EXCLUSIONS', exclusions, playersCount, additionalRounds, players);

	// Distribute exclusions across players and rounds
	// This part is a bit tricky to translate directly from the Python's
	// `sum([[i] * out[i] for i in range(rounds_count)], [])`
	// which builds a flat list of exclusion round numbers.
	// We need to decide which player sits out in which additional round.
	// A simpler way for a deterministic assignment is to rotate players.
	// The original Python's `exclusions[p + players_count * c]` implies a specific pattern.
	// Let's replicate the player exclusion pattern as precisely as possible.

	const allExclusions: number[] = [];
	for (let r = 0; r < totalRounds; r++) {
		for (let k = 0; k < out[r]; k++) {
			allExclusions.push(r);
		}
	}

	// Ensure allExclusions has the correct length, padding with 0 if necessary
	while (allExclusions.length < playersCount * additionalRounds) {
		allExclusions.push(0); // This should not happen if previous logic is correct
	}
	// Shuffle to ensure diversity if the order matters for initial distribution
	// In the original, it's implicitly deterministic by the construction.
	// For a truly fair distribution, shuffling this list would be beneficial,
	// but let's stick to the original implied deterministic logic for now.

	const resultRounds: Round[] = [];
	for (let r = 0; r < totalRounds; r++) {
		const playersInRound: Player[] = [];
		for (let p = 0; p < playersCount; p++) {
			let isExcluded = false;
			for (let c = 0; c < additionalRounds; c++) {
				// Check if player `p` is excluded in additional round `c` based on
				// the `allExclusions` flat list.
				// This is a direct translation of the Python `exclusions[p + players_count * c] == r`
				if (allExclusions[p + playersCount * c] === r) {
					isExcluded = true;
					break;
				}
			}
			if (!isExcluded) {
				playersInRound.push(players[p]);
			}
		}

		console.log('PLAYERS_IN_ROUND', playersInRound);
		resultRounds.push(Round.fromPlayers(playersInRound));
	}

	return resultRounds;
}

// Callback type for the optimize function
export type OptimizeCallback = (args: {
	step: number;
	temperature: number;
	score: number;
	trials: number;
	accepts: number;
	improves: number;
}) => void;

/**
 * Given a list of players for each round, compute an optimal seating.
 *
 * - callback is called every 100th of the way with the following keyword arguments:
 * * step
 * * temperature
 * * score
 * * trials (since last callback call)
 * * accepts (since last callback call)
 * * improves (since last callback call)
 * - fixed is the number of rounds that are left untouched by the optimisation
 * (default is all except the last one)
 *
 * Use a simulated annealing algorithm:
 * - exponential cooldown strategy
 * - given the problem shape, reset the state to the best known one regularily
 *
 * Using a list of tables per round as entry allows the function to be used for
 * corner cases like:
 * - 6, 7 and 11 players seatings
 * - change of players in the middle of a tournament
 *
 * Iterations:
 * empyrism shows that the best results are achieved calling
 * this 4x with around 20k iterations each for a full 3R+F round structure
 *
 * For successive calls to build each round as they come,
 * players going in and out of them, a simple 20k iteration is sufficient.
 */
export function optimise(
	initialRounds: Round[],
	iterations: number,
	fixed: number | null = null,
	callback: OptimizeCallback | null = null
): [Round[], Score] {
	// Random seed is not directly available in JS, Math.random() is sufficient
	// Math.random() is already seeded.

	const temperatureMin = 0.001;
	const temperatureMax = RULES[0].weight; // R1 weight
	const temperatureFactor = -Math.log(temperatureMax / temperatureMin);

	const pm = playerMapping(initialRounds);
	const roundsCount = initialRounds.length;
	let rounds: Round[] = initialRounds.map((r) => Round.copy(r));

	if (fixed === null) {
		fixed = rounds.length - 1;
	}

	let temperature = temperatureMax;
	let measures: Measure[] = rounds.map((r) => measure(pm, r));

	let sumOfMeasures = measures.reduce(
		(acc, m) => (acc ? addMeasures(acc, m) : m),
		null as unknown as Measure
	)!;
	let bestScore = Score.fastTotal(sumOfMeasures, roundsCount);
	let previousScore = bestScore;

	let bestState: Round[] = rounds.map((r) => Round.copy(r));

	for (let i = fixed; i < rounds.length; i++) {
		rounds[i].shuffle();
	}

	let trials = 0;
	let accepts = 0;
	let improves = 0;

	const roundsGlobalIndexes = rounds.map((r) => r._globalIndexes());

	for (let step = 0; step < iterations; step++) {
		temperature = temperatureMax * Math.exp((temperatureFactor * step) / iterations);

		const roundIndex = Math.floor(Math.random() * (roundsCount - fixed)) + fixed;
		const currentRound = rounds[roundIndex];
		const globalIndexes = roundsGlobalIndexes[roundIndex];

		const length = currentRound.playersCount();
		if (length === 0) continue; // Skip if round is empty

		const randIdx1 = Math.floor(Math.random() * length);
		const randIdx2 = Math.floor(Math.random() * length);

		const [i1, i2] = globalIndexes.get(randIdx1)!;
		const [j1, j2] = globalIndexes.get(randIdx2)!;

		// Perform swap
		const player1 = currentRound.tables[i1][i2];
		const player2 = currentRound.tables[j1][j2];
		currentRound.tables[i1][i2] = player2;
		currentRound.tables[j1][j2] = player1;

		// Only recompute the changed round's measure
		const previousMeasureForRound = measures[roundIndex];
		measures[roundIndex] = measure(pm, currentRound, previousMeasureForRound, [i1, j1]); // Hints for affected tables

		sumOfMeasures = measures.reduce(
			(acc, m) => (acc ? addMeasures(acc, m) : m),
			null as unknown as Measure
		)!;
		const currentScore = Score.fastTotal(sumOfMeasures, roundsCount);
		const scoreDiff = currentScore - previousScore;

		trials++;

		// Acceptance criteria
		if (scoreDiff > 0 && Math.exp(-scoreDiff / temperature) < Math.random()) {
			// Revert swap
			currentRound.tables[i1][i2] = player1;
			currentRound.tables[j1][j2] = player2;
			measures[roundIndex] = previousMeasureForRound; // Revert measure as well
		} else {
			accepts++;
			previousScore = currentScore;
			if (scoreDiff < 0.0) {
				improves++;
			}
			if (currentScore < bestScore) {
				bestState = rounds.map((r) => Round.copy(r));
				bestScore = currentScore;
			}
		}

		// Every 100th of the way, call the callback and reset to best known state
		if (step > 0 && step % (Math.floor(iterations / 100) || 1) === 0) {
			if (callback) {
				callback({
					step: step,
					temperature: temperature,
					score: currentScore,
					trials: trials,
					accepts: accepts,
					improves: improves
				});
			}
			trials = 0;
			accepts = 0;
			improves = 0;
			rounds = bestState.map((r) => Round.copy(r)); // Reset to best state
			measures = rounds.map((r) => measure(pm, r)); // Recompute measures for the reset state
			previousScore = bestScore;
		}
	}

	return [bestState, new Score(bestState, pm)];
}

export function optimiseTable(rounds: Round[], tableIndex: number): number {
	const currentRound = Round.copy(rounds[rounds.length - 1]);
	let bestScore = Infinity;
	let bestTable: Player[] = [...currentRound.getTable(tableIndex)]; // Copy initial best table

	const pm = playerMapping(rounds);
	const roundsCount = rounds.length;
	const measures = rounds.map((r) => measure(pm, r)); // Measures for all rounds

	const originalTable = currentRound.getTable(tableIndex);

	// Generate permutations for the current table
	function* getPermutations<T>(arr: T[]): Iterable<T[]> {
		if (arr.length === 0) {
			yield [];
			return;
		}
		for (let i = 0; i < arr.length; i++) {
			const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
			for (const p of getPermutations(rest)) {
				yield [arr[i], ...p];
			}
		}
	}

	for (const permutation of getPermutations(originalTable)) {
		currentRound.setTable(tableIndex, permutation);
		// Recompute measure only for the last round and affected table
		measures[rounds.length - 1] = measure(pm, currentRound, undefined, [tableIndex]);
		const score = Score.fastTotal(
			measures.reduce((acc, m) => (acc ? addMeasures(acc, m) : m), null as unknown as Measure)!,
			roundsCount
		);

		if (score < bestScore) {
			bestScore = score;
			bestTable = [...permutation];
		}
	}

	rounds[rounds.length - 1].setTable(tableIndex, bestTable);
	return bestScore;
}

// Worker thread for parallel optimisation
if (!isMainThread) {
	const { initialRounds, iterations, fixed } = workerData;
	const rounds: Round[] = initialRounds.map((rData: any) => new Round(rData.tables));
	const [bestState, finalScore] = optimise(rounds, iterations, fixed);
	parentPort?.postMessage({
		bestState: bestState.map((r) => ({ tables: r.iterTables() })), // Serialize Round objects
		finalScore: finalScore
	});
}

export function archonSeating(
	playersCount: number,
	roundsPerPlayer: number
): Promise<[Round[], Score]> {
	const players: Player[] = Array.from({ length: playersCount }, (_, i) => `Player ${i + 1}`);
	const initialRounds = getRounds(players, roundsPerPlayer);

	let cpus: number;
	try {
		cpus = os.cpus().length;
	} catch {
		cpus = 1;
	}

	if (cpus === 0) {
		cpus = 1; // Fallback for environments where os.cpus() returns 0 or fails
	}

	return new Promise((resolve, reject) => {
		let completedWorkers = 0;
		let bestResult: [Round[], Score] | null = null;

		for (let i = 0; i < cpus; i++) {
			const worker = new Worker(__filename, {
				workerData: {
					initialRounds: initialRounds.map((r) => ({ tables: Array.from(r.iterTables()) })), // Serialize Round objects for worker
					iterations: 80000,
					fixed: 1
				}
			});

			worker.on('message', (message: { bestState: any[]; finalScore: Score }) => {
				const workerRounds = message.bestState.map((rData: any) => new Round(rData.tables));
				const workerScore = Object.assign(new Score([], null), message.finalScore); // Re-hydrate Score object

				if (!bestResult || workerScore.total < bestResult[1].total) {
					bestResult = [workerRounds, workerScore];
				}
				completedWorkers++;
				if (completedWorkers === cpus) {
					if (bestResult) {
						resolve(bestResult);
					} else {
						reject(new Error('No results from workers.'));
					}
				}
			});

			worker.on('error', reject);
			worker.on('exit', (code) => {
				if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
			});
		}
	});
}
