import { type IMeasure, RULES } from './constants';

export class Score {
	static fastTotal(measure: IMeasure): number {
		const iMax = measure.oppMatrix.length;
		const jMax = measure.oppMatrix[0].length;

		let countSamePredPrey = 0;
		let countOppMoreThanTwice = 0;
		let countOppMoreThanOnce = 0;
		let countOppRelationshipMoreThanOnce = 0;
		let countSamePositionGroupsTwice = 0;

		let countFifthSeatMoreThanOnce = 0;
		let countSameSeatMoreThanOnce = 0;

		// Check opponent matrix for scores
		for (let i = 0; i < iMax; i++) {
			for (let j = 0; j < jMax; j++) {
				const row = measure.oppMatrix[i][j];
				if (row[0] > 1) {
					countOppMoreThanOnce++;
					if (row[0] > 2) countOppMoreThanTwice++;
					if (row[1] > 1) {
						countSamePredPrey++;
						countOppRelationshipMoreThanOnce++;
					}
					if (row[2] > 1) countOppRelationshipMoreThanOnce++;
					if (row[3] > 1) countOppRelationshipMoreThanOnce++;
					if (row[4] > 1) countOppRelationshipMoreThanOnce++;
					if (row[5] > 1) countOppRelationshipMoreThanOnce++;
					if (row[6] > 1) countSamePositionGroupsTwice++;
					if (row[7] > 1) countSamePositionGroupsTwice++;
				}
			}
		}

		// Check position matrix for scores
		for (let i = 0, iMax = measure.posMatrix.length; i < iMax; i++) {
			const row = measure.posMatrix[i];

			if (row[3] > 1) countSameSeatMoreThanOnce++;
			if (row[3] > 1) countSameSeatMoreThanOnce++;
			if (row[4] > 1) countSameSeatMoreThanOnce++;
			if (row[6] > 1) countSameSeatMoreThanOnce++;
			if (row[7] > 1) {
				countFifthSeatMoreThanOnce++;
				countSameSeatMoreThanOnce++;
			}
		}

		const vps = measure.posMatrix.map((row) => row[1] / row[0]);
		const transfers = measure.posMatrix.map((row) => row[2] / row[0]);
		const vpMean = vps.reduce((a, b) => a + b, 0) / vps.length;
		const transferMean = transfers.reduce((a, b) => a + b, 0) / transfers.length;

		const rules = [
			// Same predator-prey relationship
			countSamePredPrey,
			// Opponents more than twice
			Math.floor(countOppMoreThanTwice / 2),
			// VPs difference
			vps.reduce((sum, player) => sum + (player - vpMean) ** 2, 0) / vps.length,
			// Opponents more than once
			Math.floor(countOppMoreThanOnce / 2),
			// Fifth seat more than once
			countFifthSeatMoreThanOnce,
			// Same opponent relationship more than once
			countOppRelationshipMoreThanOnce,
			// Same table seat more than once
			countSameSeatMoreThanOnce,
			// Transfers difference
			transfers.reduce((sum, player) => sum + (player - transferMean) ** 2, 0) / transfers.length,
			// Same position groups for an opponent twice
			Math.floor(countSamePositionGroupsTwice / 2)
		];

		return rules.reduce((sum, rule, idx) => sum + rule * RULES[idx][2], 0);
	}

	static total(measure: IMeasure): number {
		const iMax = measure.oppMatrix.length;
		const jMax = measure.oppMatrix[0].length;

		let countSamePredPrey = 0;
		let countOppMoreThanTwice = 0;
		let countOppMoreThanOnce = 0;
		let countOppRelationshipMoreThanOnce = 0;
		let countSamePositionGroupsTwice = 0;

		let countFifthSeatMoreThanOnce = 0;
		let countSameSeatMoreThanOnce = 0;

		// Check opponent matrix for scores
		for (let i = 0; i < iMax; i++) {
			for (let j = 0; j < jMax; j++) {
				const row = measure.oppMatrix[i][j];
				if (row[0] > 1) {
					countOppMoreThanOnce++;
					if (row[0] > 2) countOppMoreThanTwice++;
					if (row[1] > 1) {
						countSamePredPrey++;
						countOppRelationshipMoreThanOnce++;
					}
					if (row[2] > 1) countOppRelationshipMoreThanOnce++;
					if (row[3] > 1) countOppRelationshipMoreThanOnce++;
					if (row[4] > 1) countOppRelationshipMoreThanOnce++;
					if (row[5] > 1) countOppRelationshipMoreThanOnce++;
					if (row[6] > 1) countSamePositionGroupsTwice++;
					if (row[7] > 1) countSamePositionGroupsTwice++;
				}
			}
		}

		// Check position matrix for scores
		for (let i = 0, iMax = measure.posMatrix.length; i < iMax; i++) {
			const row = measure.posMatrix[i];

			if (row[3] > 1) countSameSeatMoreThanOnce++;
			if (row[3] > 1) countSameSeatMoreThanOnce++;
			if (row[4] > 1) countSameSeatMoreThanOnce++;
			if (row[6] > 1) countSameSeatMoreThanOnce++;
			if (row[7] > 1) {
				countFifthSeatMoreThanOnce++;
				countSameSeatMoreThanOnce++;
			}
		}

		const vps = measure.posMatrix.map((row) => row[1] / row[0]);
		const transfers = measure.posMatrix.map((row) => row[2] / row[0]);
		const vpMean = vps.reduce((a, b) => a + b, 0) / vps.length;
		const transferMean = transfers.reduce((a, b) => a + b, 0) / transfers.length;

		const rules = [
			// Same predator-prey relationship
			countSamePredPrey,
			// Opponents more than twice
			Math.floor(countOppMoreThanTwice / 2),
			// VPs difference
			vps.reduce((sum, player) => sum + (player - vpMean) ** 2, 0) / vps.length,
			// Opponents more than once
			Math.floor(countOppMoreThanOnce / 2),
			// Fifth seat more than once
			countFifthSeatMoreThanOnce,
			// Same opponent relationship more than once
			countOppRelationshipMoreThanOnce,
			// Same table seat more than once
			countSameSeatMoreThanOnce,
			// Transfers difference
			transfers.reduce((sum, player) => sum + (player - transferMean) ** 2, 0) / transfers.length,
			// Same position groups for an opponent twice
			Math.floor(countSamePositionGroupsTwice / 2)
		];

		return rules.reduce((sum, rule, idx) => sum + rule * RULES[idx][2], 0);
	}
}
