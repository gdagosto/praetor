// seating.test.js
import { describe, test, expect } from 'vitest';

import {
	getRounds,
	Round,
	measure,
	Score,
	playerMapping,
	optimise,
	optimiseTable,
	addMeasures
} from './seatingGemini.js'; // Import your seating module

describe('seating', () => {
	describe('get_rounds', () => {
		test('should return the correct number of tables for 5 players and 2 rounds', () => {
			expect(getRounds([...Array(5).keys()], 2).length).toBe(2);
		});

		test('should return the correct number of tables for 6 players and 2 rounds', () => {
			expect(getRounds([...Array(6).keys()], 2).length).toBe(3);
		});

		test('should return the correct number of tables for 7 players and 2 rounds', () => {
			expect(getRounds([...Array(7).keys()], 2).length).toBe(3);
		});

		test('should return the correct number of tables for 8 players and 2 rounds', () => {
			expect(getRounds([...Array(8).keys()], 2).length).toBe(2);
		});

		test('should return the correct number of tables for 9 players and 2 rounds', () => {
			expect(getRounds([...Array(9).keys()], 2).length).toBe(2);
		});

		test('should return the correct number of tables for 10 players and 2 rounds', () => {
			expect(getRounds([...Array(10).keys()], 2).length).toBe(2);
		});

		test('should return the correct number of tables for 11 players and 2 rounds', () => {
			expect(getRounds([...Array(11).keys()], 2).length).toBe(3);
		});

		test('should return the correct number of tables for 12 players and 2 rounds', () => {
			expect(getRounds([...Array(12).keys()], 2).length).toBe(2);
		});

		test('should return the correct number of tables for 6 players and 3 rounds', () => {
			expect(getRounds([...Array(6).keys()], 3).length).toBe(4);
		});

		test('should return the correct number of tables for 7 players and 3 rounds', () => {
			expect(getRounds([...Array(7).keys()], 3).length).toBe(5);
		});

		test('should return the correct number of tables for 11 players and 3 rounds', () => {
			expect(getRounds([...Array(11).keys()], 3).length).toBe(4);
		});

		test('should return the correct number of tables for 7 players and 4 rounds', () => {
			expect(getRounds([...Array(7).keys()], 4).length).toBe(6);
		});

		test('should return the correct number of tables for 7 players and 5 rounds', () => {
			expect(getRounds([...Array(7).keys()], 5).length).toBe(7);
		});

		test('should return the correct number of tables for 7 players and 6 rounds', () => {
			expect(getRounds([...Array(7).keys()], 6).length).toBe(9);
		});

		test('should return the correct number of tables for 6 players and 6 rounds', () => {
			expect(getRounds([...Array(6).keys()], 6).length).toBe(7);
		});

		test('should return the correct number of tables for 6 players and 7 rounds', () => {
			expect(getRounds([...Array(6).keys()], 7).length).toBe(9);
		});
	});

	describe('Round.fromPlayers', () => {
		test('should create a single table for 4 players', () => {
			// In JS, we compare the internal 'tables' array for the Round object
			expect(Round.fromPlayers([1, 2, 3, 4]).tables).toEqual([[1, 2, 3, 4]]);
		});

		test('should create a single table for 5 players', () => {
			expect(Round.fromPlayers([1, 2, 3, 4, 5]).tables).toEqual([[1, 2, 3, 4, 5]]);
		});

		test('should split players into two tables for 8 players', () => {
			expect(Round.fromPlayers([1, 2, 3, 4, 5, 6, 7, 8]).tables).toEqual([
				[1, 2, 3, 4],
				[5, 6, 7, 8]
			]);
		});

		test('should split players into two tables for 9 players', () => {
			expect(Round.fromPlayers([1, 2, 3, 4, 5, 6, 7, 8, 9]).tables).toEqual([
				[1, 2, 3, 4, 5],
				[6, 7, 8, 9]
			]);
		});

		test('should handle string player IDs correctly', () => {
			expect(Round.fromPlayers(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']).tables).toEqual([
				['A', 'B', 'C', 'D', 'E'],
				['F', 'G', 'H', 'I']
			]);
		});
	});

	describe('measure', () => {
		test('should correctly measure for 4 players', () => {
			const mapping = new Map();
			mapping.set(1, 0);
			mapping.set(2, 1);
			mapping.set(3, 2);
			mapping.set(4, 3);

			const M = measure(structuredClone(mapping), Round.fromPlayers([1, 2, 3, 4]));
			expect(M.position).toEqual([
				[1, 4, 1, 1, 0, 0, 0, 0],
				[1, 4, 2, 0, 1, 0, 0, 0],
				[1, 4, 3, 0, 0, 1, 0, 0],
				[1, 4, 4, 0, 0, 0, 1, 0]
			]);
			expect(M.opponents).toEqual([
				[
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 1, 0, 0, 0, 0, 1, 0],
					[1, 0, 0, 0, 0, 1, 0, 1],
					[1, 0, 0, 0, 1, 0, 1, 0]
				],
				[
					[1, 0, 0, 0, 1, 0, 1, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 1, 0, 0, 0, 0, 1, 0],
					[1, 0, 0, 0, 0, 1, 0, 1]
				],
				[
					[1, 0, 0, 0, 0, 1, 0, 1],
					[1, 0, 0, 0, 1, 0, 1, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 1, 0, 0, 0, 0, 1, 0]
				],
				[
					[1, 1, 0, 0, 0, 0, 1, 0],
					[1, 0, 0, 0, 0, 1, 0, 1],
					[1, 0, 0, 0, 1, 0, 1, 0],
					[0, 0, 0, 0, 0, 0, 0, 0]
				]
			]);
		});

		test('should correctly sum two measures', () => {
			const mapping = new Map();
			mapping.set(1, 0);
			mapping.set(2, 1);
			mapping.set(3, 2);
			mapping.set(4, 3);

			const M = measure(structuredClone(mapping), Round.fromPlayers([1, 2, 3, 4]));
			const MM = addMeasures(M, M); // Assuming `sum` method on Measure object
			expect(MM.position).toEqual([
				[2, 8, 2, 2, 0, 0, 0, 0],
				[2, 8, 4, 0, 2, 0, 0, 0],
				[2, 8, 6, 0, 0, 2, 0, 0],
				[2, 8, 8, 0, 0, 0, 2, 0]
			]);
			expect(MM.opponents).toEqual([
				[
					[0, 0, 0, 0, 0, 0, 0, 0],
					[2, 2, 0, 0, 0, 0, 2, 0],
					[2, 0, 0, 0, 0, 2, 0, 2],
					[2, 0, 0, 0, 2, 0, 2, 0]
				],
				[
					[2, 0, 0, 0, 2, 0, 2, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[2, 2, 0, 0, 0, 0, 2, 0],
					[2, 0, 0, 0, 0, 2, 0, 2]
				],
				[
					[2, 0, 0, 0, 0, 2, 0, 2],
					[2, 0, 0, 0, 2, 0, 2, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[2, 2, 0, 0, 0, 0, 2, 0]
				],
				[
					[2, 2, 0, 0, 0, 0, 2, 0],
					[2, 0, 0, 0, 0, 2, 0, 2],
					[2, 0, 0, 0, 2, 0, 2, 0],
					[0, 0, 0, 0, 0, 0, 0, 0]
				]
			]);
		});

		test('should correctly measure for 5 players', () => {
			const mapping = new Map();
			mapping.set(1, 0);
			mapping.set(2, 1);
			mapping.set(3, 2);
			mapping.set(4, 3);
			mapping.set(5, 4);

			const M = measure(structuredClone(mapping), Round.fromPlayers([1, 2, 3, 4, 5]));
			expect(M.position).toEqual([
				[1, 5, 1, 1, 0, 0, 0, 0],
				[1, 5, 2, 0, 1, 0, 0, 0],
				[1, 5, 3, 0, 0, 1, 0, 0],
				[1, 5, 4, 0, 0, 0, 1, 0],
				[1, 5, 4, 0, 0, 0, 0, 1]
			]);
			expect(M.opponents).toEqual([
				[
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 1, 0, 0, 0, 0, 1, 0],
					[1, 0, 1, 0, 0, 0, 0, 1],
					[1, 0, 0, 1, 0, 0, 0, 1],
					[1, 0, 0, 0, 1, 0, 1, 0]
				],
				[
					[1, 0, 0, 0, 1, 0, 1, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 1, 0, 0, 0, 0, 1, 0],
					[1, 0, 1, 0, 0, 0, 0, 1],
					[1, 0, 0, 1, 0, 0, 0, 1]
				],
				[
					[1, 0, 0, 1, 0, 0, 0, 1],
					[1, 0, 0, 0, 1, 0, 1, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 1, 0, 0, 0, 0, 1, 0],
					[1, 0, 1, 0, 0, 0, 0, 1]
				],
				[
					[1, 0, 1, 0, 0, 0, 0, 1],
					[1, 0, 0, 1, 0, 0, 0, 1],
					[1, 0, 0, 0, 1, 0, 1, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 1, 0, 0, 0, 0, 1, 0]
				],
				[
					[1, 1, 0, 0, 0, 0, 1, 0],
					[1, 0, 1, 0, 0, 0, 0, 1],
					[1, 0, 0, 1, 0, 0, 0, 1],
					[1, 0, 0, 0, 1, 0, 1, 0],
					[0, 0, 0, 0, 0, 0, 0, 0]
				]
			]);
		});

		test('should correctly measure for 5 players with previous measure and hints', () => {
			const mapping = new Map();
			mapping.set(1, 0);
			mapping.set(2, 1);
			mapping.set(3, 2);
			mapping.set(4, 3);
			mapping.set(5, 4);

			const M = measure(structuredClone(mapping), Round.fromPlayers([1, 2, 3, 4, 5]));
			const M2 = measure(structuredClone(mapping), Round.fromPlayers([1, 2, 5, 4, 3]), M, [0]);
			expect(M2.position).toEqual([
				[1, 5, 1, 1, 0, 0, 0, 0],
				[1, 5, 2, 0, 1, 0, 0, 0],
				[1, 5, 4, 0, 0, 0, 0, 1],
				[1, 5, 4, 0, 0, 0, 1, 0],
				[1, 5, 3, 0, 0, 1, 0, 0]
			]);
			expect(M2.opponents).toEqual([
				[
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 1, 0, 0, 0, 0, 1, 0],
					[1, 0, 0, 0, 1, 0, 1, 0],
					[1, 0, 0, 1, 0, 0, 0, 1],
					[1, 0, 1, 0, 0, 0, 0, 1]
				],
				[
					[1, 0, 0, 0, 1, 0, 1, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 0, 0, 1, 0, 0, 0, 1],
					[1, 0, 1, 0, 0, 0, 0, 1],
					[1, 1, 0, 0, 0, 0, 1, 0]
				],
				[
					[1, 1, 0, 0, 0, 0, 1, 0],
					[1, 0, 1, 0, 0, 0, 0, 1],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 0, 0, 0, 1, 0, 1, 0],
					[1, 0, 0, 1, 0, 0, 0, 1]
				],
				[
					[1, 0, 1, 0, 0, 0, 0, 1],
					[1, 0, 0, 1, 0, 0, 0, 1],
					[1, 1, 0, 0, 0, 0, 1, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 0, 0, 0, 1, 0, 1, 0]
				],
				[
					[1, 0, 0, 1, 0, 0, 0, 1],
					[1, 0, 0, 0, 1, 0, 1, 0],
					[1, 0, 1, 0, 0, 0, 0, 1],
					[1, 1, 0, 0, 0, 0, 1, 0],
					[0, 0, 0, 0, 0, 0, 0, 0]
				]
			]);
		});
	});

	describe('score', () => {
		test('should calculate the score properties correctly', () => {
			const permutations = [
				[1, 2, 3, 4, 5],
				[2, 5, 3, 1, 4],
				[2, 1, 5, 4, 3]
			];
			const rounds = permutations.map((p) => Round.fromPlayers(p));
			const score = new Score(rounds);

			expect(score.R1).toEqual([]);
			expect(score.R2).toEqual([
				[1, 2],
				[1, 3],
				[1, 4],
				[1, 5],
				[2, 3],
				[2, 4],
				[2, 5],
				[3, 4],
				[3, 5],
				[4, 5]
			]);
			expect(score.R3).toBe(0.0);
			expect(score.R4).toEqual([
				[1, 2],
				[1, 3],
				[1, 4],
				[1, 5],
				[2, 3],
				[2, 4],
				[2, 5],
				[3, 4],
				[3, 5],
				[4, 5]
			]);
			expect(score.R7).toEqual([
				[2, 1],
				[3, 3],
				[4, 4]
			]);
			expect(score.R5).toEqual([]);
			expect(score.R6).toEqual([]);
			expect(score.R8).toBeCloseTo(0.9092121131323905);
			expect(score.R9).toEqual([
				[1, 2, 1],
				[1, 3, 2],
				[1, 4, 2],
				[1, 5, 1],
				[2, 3, 1],
				[2, 4, 2],
				[2, 5, 2],
				[3, 4, 1],
				[3, 5, 2],
				[4, 5, 1]
			]);
			expect(score.mean_vps).toBe(5.0);
			expect(score.mean_transfers).toBe(2.8);
			expect(score.vps).toEqual([]);
			expect(score.transfers).toEqual([
				[1, 2 + 1 / 3],
				[2, 1 + 1 / 3],
				[3, 3 + 1 / 3],
				[4, 4.0]
			]);
			expect(score.rules).toEqual([0, 10, 0, 10, 0, 0, 3, 0.9092121131323905, 10]);
			expect(score.total).toBeCloseTo(10010003100.921211);

			const pm = playerMapping(rounds);
			// Simulating Python's sum on Measure objects
			let measureSum = measure(pm, rounds[0]);
			for (let i = 1, iMax = rounds.length; i < iMax; i++) {
				measureSum = addMeasures(measureSum, measure(pm, rounds[i]));
			}

			const fast_total = Score.fastTotal(measureSum, rounds.length);
			expect(fast_total).toBeCloseTo(10010003092.666666);
		});
	});

	describe('optimise', () => {
		test('should optimize rounds for 13 players', () => {
			// We're relying on the mock `optimise` for this test
			const [rounds, score] = optimise(getRounds([...Array(13).keys()], 3), 1000);
			expect(rounds.length).toBe(3);
			expect(score.mean_vps).toBeCloseTo(4.38462);
			expect(score.mean_transfers).toBeCloseTo(2.61538);
			expect(score.R3).toBeGreaterThan(0);
			expect(score.R4.length).toBeGreaterThan(0);
			expect(score.R8).toBeGreaterThan(0);
			expect(score.R9.length).toBeGreaterThan(0);
		});

		test('should optimize rounds for 6 players', () => {
			// We're relying on the mock `optimise` for this test
			const [rounds, score] = optimise(getRounds([...Array(6).keys()], 2), 1000);
			expect(rounds.length).toBe(3);
			expect(score.mean_vps).toBeCloseTo(4.0);
			expect(score.mean_transfers).toBeCloseTo(2.5);
		});
	});

	describe('optimise_table', () => {
		test('should optimize a specific table within rounds', () => {
			const permutations = [
				[1, 2, 3, 4, 5],
				[2, 5, 3, 1, 4]
			];
			const rounds = permutations.map((p) => Round.fromPlayers(p));

			// On second round, player 4 leaves. Table needs to be re-optimized
			// Simulating the Python's `set_table` behavior for the test
			// In JS, you'd likely have a method on the Round class to modify a table.
			rounds[1].setTable(0, [2, 5, 3, 1]); // This modifies the mock Round object

			const score = optimiseTable(rounds, 0); // This will also modify `rounds` as per the mock
			expect(rounds[0].tables).toEqual([[1, 2, 3, 4, 5]]);
			expect(rounds[1].tables).toEqual([[5, 3, 2, 1]]); // This is the expected result after optimization
			expect(score).toBe(6010000041.0);
		});
	});
});
