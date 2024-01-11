type IRule = [string, string, number];

export type IMeasure = {
	posMatrix: number[][];
	oppMatrix: number[][][];
};

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

export const OPPONENTS = {
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

export const POSITIONS = {
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
