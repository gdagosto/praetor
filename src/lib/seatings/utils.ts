export function range(n: number) {
	const a = new Array(n);
	for (let i = 0; i < n; i++) a[i] = i;
	return a;
}

export function fast2DMatrix(positions: [number, number], fill = 0): number[][] {
	const a = new Array(positions[0]);
	for (let i = 0; i < positions[0]; i++) {
		a[i] = new Array(positions[1]);
		for (let j = 0; j < positions[1]; j++) {
			a[i][j] = fill;
		}
	}

	return a;
}

export function fast3DMatrix(positions: [number, number, number], fill = 0): number[][][] {
	const a = new Array(positions[0]);
	for (let i = 0; i < positions[0]; ++i) {
		a[i] = fast2DMatrix([positions[1], positions[2]], fill);
	}

	return a;
}

export function sum2D(a: number[][], b: number[][]) {
	/** Matrices should be the same dimensions. Don't check it to speed up */
	const rows = a.length;
	const cols = a[0].length;

	const c: number[][] = new Array(rows);
	for (let i = 0, iMax = rows; i < iMax; i++) {
		const row: number[] = new Array(cols);
		for (let j = 0, jMax = cols; j < jMax; j++) {
			row[j] = a[i][j] + b[i][j];
		}
		c[i] = row;
	}
	return c;
}

export function sum3D(a: number[][][], b: number[][][]) {
	/** Matrices should be the same dimensions. Don't check it to speed up */
	const matrices = a.length;
	const c: number[][][] = new Array(matrices);
	for (let i = 0, iMax = matrices; i < iMax; i++) {
		c[i] = sum2D(a[i], b[i]);
	}
	return c;
}

export function getRoundGlobalIndexes(r: number[][]) {
	const indexes = [];
	for (let t = 0, tMax = r.length; t < tMax; t++) {
		for (let p = 0, pMax = r[t].length; p < pMax; p++) {
			indexes.push([t, p]);
		}
	}

	return indexes;
}
