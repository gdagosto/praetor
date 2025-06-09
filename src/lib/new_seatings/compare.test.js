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
import { generateRound } from '$lib/seatings/worker/class.js';

describe('compare', () => {
	describe('score', () => {
		test('compare score - 1', () => {
			const r1 = generateRound(0, [], [0, 1, 2, 3, 4], 5, 2);
			const r2 = generateRound(1, [r1.round], [0, 1, 2, 3, 4], 5, 2);

			// Get score from geminiOne
			const geminiScore = new Score([
				Round.fromPlayers(r1.round[0]),
				Round.fromPlayers(r2.round[0])
			]);

			console.log('R1_SCORE', r2.score);
			console.log('GEMINI_SCORE', geminiScore.total);

			expect(r2.score).toEqual(geminiScore.total);
		});

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
	});
});
