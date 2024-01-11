export * from './random.js';
export * from './zod.js';

export function newArray(size: number) {
	return [...new Array(size)];
}

export function forEachPair<T>(array: T[], callback: (a: T, b: T) => void) {
	for (let i = 0; i < array.length - 1; i++) {
		for (let j = i + 1; j < array.length; j++) {
			callback(array[i], array[j]);
		}
	}
}

export function forEachAdjacent<T>(array: T[], callback: (a: T, b: T) => void) {
	const len = array.length - 1;
	for (let i = 0; i < len; i++) {
		callback(array[i], array[i + 1]);
	}

	callback(array[len], array[0]);
}

export const resolvePath = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	object: Record<any, any>,
	path: string | Array<string | number>,
	defaultValue: string | null = null
) => {
	if (Array.isArray(path)) {
		return path.reduce((o, p) => (o ? o[p] : defaultValue), object);
	} else if (typeof path === 'string') {
		return object[path];
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setPath = (object: Record<any, any>, path: Array<string | number>, value: any) => {
	return path.reduce((o, p, i) => {
		if (path.length === ++i) {
			return (o[p] = value);
		}

		if (o[p]) {
			// eslint-disable-next-line no-self-assign
			return (o[p] = o[p]);
		}

		if (typeof p === 'number') {
			return (o[p] = []);
		} else {
			return (o[p] = {});
		}
	}, object);
};
