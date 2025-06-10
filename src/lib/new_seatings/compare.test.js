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
		describe('compare|1', () => {
			const r1 = generateRound(0, [], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 15, 2);
			const r2 = generateRound(
				1,
				[r1.round],
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
				15,
				2
			);

			// To generate gemini rounds, we need to group up a round from R2 into a single array.
			const geminiRound1 = r1.round.flat();
			const geminiRound2 = r2.round.flat();

			const geminiRounds = [Round.fromPlayers(geminiRound1), Round.fromPlayers(geminiRound2)];

			// Get score from geminiOne
			const geminiScore = new Score(geminiRounds);

			console.log('ROUNDS_R2', [r1.round, r2.round]);
			console.log('ROUNDS_GEMINI', [geminiRounds[0].tables, geminiRounds[1].tables]);

			test('R1', () => {
				console.log('R2_SCORE_R1', r2.score.R1);
				console.log('geminiScore_R1', geminiScore.R1);
				expect(r2.score.R1).toEqual(geminiScore.R1);
			});
			test('R2', () => {
				console.log('R2_SCORE_R2', r2.score.R2);
				console.log('geminiScore_R2', geminiScore.R2);
				expect(r2.score.R2).toEqual(geminiScore.R2);
			});
			test('R3', () => {
				console.log('R2_SCORE_R3', r2.score.R3);
				console.log('geminiScore_R3', geminiScore.R3);
				expect(r2.score.R3).toEqual(geminiScore.R3);
			});
			test('R4', () => {
				console.log('R2_SCORE_R4', r2.score.R4);
				console.log('geminiScore_R4', geminiScore.R4);
				expect(r2.score.R4).toEqual(geminiScore.R4);
			});
			test('R5', () => {
				console.log('R2_SCORE_R5', r2.score.R5);
				console.log('geminiScore_R5', geminiScore.R5);
				expect(r2.score.R5).toEqual(geminiScore.R5);
			});
			test('R6', () => {
				console.log('R2_SCORE_R6', r2.score.R6);
				console.log('geminiScore_R6', geminiScore.R6);
				expect(r2.score.R6).toEqual(geminiScore.R6);
			});
			test('R7', () => {
				console.log('R2_SCORE_R7', r2.score.R7);
				console.log('geminiScore_R7', geminiScore.R7);
				expect(r2.score.R7).toEqual(geminiScore.R7);
			});
			test('R8', () => {
				console.log('R2_SCORE_R8', r2.score.R8);
				console.log('geminiScore_R8', geminiScore.R8);
				expect(r2.score.R8).toEqual(geminiScore.R8);
			});
			test('R9', () => {
				console.log('R2_SCORE_R9', r2.score.R9);
				console.log('geminiScore_R9', geminiScore.R9);
				expect(r2.score.R9).toEqual(geminiScore.R9);
			});
			test('mean_vps', () => {
				console.log('R2_SCORE_mean_vps', r2.score.mean_vps);
				console.log('geminiScore_mean_vps', geminiScore.mean_vps);
				expect(r2.score.mean_vps).toEqual(geminiScore.mean_vps);
			});
			test('mean_transfers', () => {
				console.log('R2_SCORE_mean_transfers', r2.score.mean_transfers);
				console.log('geminiScore_mean_transfers', geminiScore.mean_vps);
				expect(r2.score.mean_transfers).toEqual(geminiScore.mean_transfers);
			});
			test('vps', () => {
				console.log('R2_SCORE_mean_vps', r2.score.mean_vps);
				console.log('geminiScore_mean_vps', geminiScore.mean_vps);
				expect(r2.score.vps).toEqual(geminiScore.vps);
			});
			test('transfers', () => {
				console.log('R2_SCORE_transfers', r2.score.transfers);
				console.log('geminiScore_transfers', geminiScore.transfers);
				expect(r2.score.transfers).toEqual(geminiScore.transfers);
			});
			test('rules', () => {
				console.log('R2_SCORE_rules', r2.score.rules);
				console.log('geminiScore_rules', geminiScore.rules);
				expect(r2.score.rules).toEqual(geminiScore.rules);
			});

			test('total', () => {
				console.log('R2_SCORE_total', r2.score.total);
				console.log('geminiScore_total', geminiScore.total);
				expect(r2.score.total).toEqual(geminiScore.total);
			});
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
