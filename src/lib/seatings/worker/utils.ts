export function getRoundGlobalIndexes(r: number[][]) {
	const indexes = [];
	for (let t = 0, tMax = r.length; t < tMax; t++) {
		for (let p = 0, pMax = r[t].length; p < pMax; p++) {
			indexes.push([t, p]);
		}
	}

	return indexes;
}

// From: https://github.com/queviva/yacht-fisher
export const shuffle = <T extends unknown[]>(v: T, r = [...v]) =>
	v.map(() => r.splice(~~(Math.random() * r.length), 1)[0]) as T;

export function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
