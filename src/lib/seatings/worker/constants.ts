type IRule = [string, string, number];

export type IMeasure = {
	posMatrix: number[][];
	oppMatrix: number[][][];
};

export const ITERATIONS = 20000;

export const RULES: IRule[] = [
	['R1', 'predator-prey', 10 ** 10],
	['R2', 'opponent thrice', 10 ** 9],
	['R3', 'available vps', 10 ** 8],
	['R4', 'opponent twice', 10 ** 6],
	['R5', 'fifth seat', 10 ** 5],
	['R6', 'position', 10 ** 4],
	['R7', 'same seat', 10 ** 3],
	['R8', 'starting transfers', 10 ** 2],
	['R9', 'position group', 1]
];
