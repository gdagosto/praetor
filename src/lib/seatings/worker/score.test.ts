import { describe, test, expect } from 'vitest';

import { Score } from './score';
import { generateRound } from './class';

describe('score', () => {
	test('test_scores', () => {
		const rounds = [[[0, 1, 2, 3, 4]], [[1, 4, 2, 0, 3]], [[1, 0, 4, 3, 2]]];
		const score = new Score(rounds, 5, true);
		console.log(score.rules[0]);
		expect(score.rules[0]).toEqual([]);
		expect(score.rules[1]).toEqual([
			[1, 0],
			[0, 4],
			[4, 3],
			[3, 2],
			[2, 1],
			[1, 3],
			[0, 2],
			[4, 1],
			[3, 0],
			[2, 4]
		]);
		expect(score.rules[2]).toEqual(0);
		expect(score.rules[3]).toEqual([
			[1, 4],
			[4, 2],
			[2, 0],
			[0, 3],
			[3, 1],
			[1, 0],
			[4, 3],
			[2, 1],
			[0, 4],
			[3, 2]
		]);
		expect(score.rules[4]).toEqual([]);
		expect(score.rules[5]).toEqual([]);
		expect(score.rules[6]).toEqual([
			[2, 3],
			[1, 1],
			[3, 4]
		]);
		expect(score.rules[7]).toEqual(0.9092121131323905);
		expect(score.rules[8]).toEqual([
			[1, 0, 1],
			[0, 4, 1],
			[4, 3, 1],
			[3, 2, 1],
			[2, 1, 1],
			[1, 3, 2],
			[0, 2, 2],
			[4, 1, 2],
			[3, 0, 2],
			[2, 4, 2]
		]);
		expect(score.total).toEqual(10010003100.921211);
	});

	test('optimise', () => {
		const activePlayers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		const r1 = generateRound(0, [], activePlayers, 13, 3, null);
		console.log('r1', r1);
		const r2 = generateRound(1, [r1.round], activePlayers, 13, 3, null);
		console.log('r2', r2);
		const r3 = generateRound(2, [r1.round, r2.round], activePlayers, 13, 3, null);
		console.log('r3', r3);

		expect(r3.score.rules[2]).toBeGreaterThan(0);
		expect(r3.score.rules[3].length).toBeGreaterThan(0);
		expect(r3.score.rules[7]).toBeGreaterThan(0);
		expect(r3.score.rules[8].length).toBeGreaterThan(0);
	}, 50000);

	test.only('optimise_BIG', () => {
		const numPlayers = 100;
		const arr = Array.from({ length: numPlayers }, (_, i) => i);
		const r1 = generateRound(0, [], arr, numPlayers, 3, null);
		const r2 = generateRound(1, [r1.round], arr, numPlayers, 3, null);
		const r3 = generateRound(2, [r1.round, r2.round], arr, numPlayers, 3, null);
		console.log('ROUND_3', numPlayers, r3);

		console.log('RULE1', r3.score.rules[0]);
		console.log('RULE2', r3.score.rules[1]);
		console.log('RULE3', r3.score.rules[2]);
		console.log('RULE4', r3.score.rules[3]);
		console.log('RULE5', r3.score.rules[4]);
		console.log('RULE6', r3.score.rules[5]);
		console.log('RULE7', r3.score.rules[6]);
		console.log('RULE8', r3.score.rules[7]);
		console.log('RULE9', r3.score.rules[8]);

		expect(r3.score.total).toBeGreaterThan(0);
	}, 500000);
});
