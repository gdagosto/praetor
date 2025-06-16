import { describe, test, expect } from 'vitest';

import { Score } from './score';
import { generateRound } from './class';

describe('score', () => {
	test('test_score', () => {
		const rounds = [[[0, 1, 2, 3, 4]], [[1, 4, 2, 0, 3]], [[1, 0, 4, 3, 2]]];
		const score = new Score(rounds, 5, true);
		score.prepare();
		expect(score.total).toEqual(10010003100.921211);
	});

	test.skip('optimise', () => {
		const activePlayers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		const r1 = generateRound(0, [], activePlayers, 13, 3, null);
		console.log('r1', r1);
		const r2 = generateRound(1, [r1.round], activePlayers, 13, 3, null);
		console.log('r2', r2);
		const r3 = generateRound(2, [r1.round, r2.round], activePlayers, 13, 3, null);
		console.log('r3', r3);

		expect(r3.score.rules[2]).toBeGreaterThan(0);
		expect(r3.score.rules[3]).toBeGreaterThan(0);
		expect(r3.score.rules[7]).toBeGreaterThan(0);
		expect(r3.score.rules[8]).toBeGreaterThan(0);
	}, 50000);

	test('optimise_BIG', () => {
		const numPlayers = 100;
		const arr = Array.from({ length: numPlayers }, (_, i) => i);
		const r1 = generateRound(0, [], arr, numPlayers, 3, null);
		const r2 = generateRound(1, [r1.round], arr, numPlayers, 3, null);
		// const r3 = generateRound(2, [r1.round, r2.round], arr, numPlayers, 3, null);
		console.log('ROUND_2', numPlayers, r2);

		expect(r2.score.total).toBeGreaterThan(0);
	}, 50000);
});
