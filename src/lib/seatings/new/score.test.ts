import { describe, test, expect } from 'vitest';

import { Score } from './score';

describe('score', () => {
	test('test_score', () => {
		const rounds = [[[0, 1, 2, 3, 4]], [[1, 4, 2, 0, 3]], [[1, 0, 4, 3, 2]]];
		const score = new Score(rounds, [0, 1, 2, 3, 4]);
		score.prepare();
		expect(score.score).toEqual(10010003100.921211);
	});
});
