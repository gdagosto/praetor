export class PairMap {
	private map: Map<number, number>;

	// Fake index signature to satisfy TS when using number keys like pm[1][2]
	[key: number]: any;

	constructor() {
		this.map = new Map();

		return new Proxy(this, {
			get: (target, key1: string | symbol) => {
				const k1 = Number(key1);
				if (!Number.isFinite(k1)) throw new TypeError('Key must be a number');

				return new Proxy(
					{},
					{
						get(_, key2: string | symbol) {
							const k2 = Number(key2);
							if (!Number.isFinite(k2)) throw new TypeError('Key must be a number');
							const key = target._getKey(k1, k2);
							return target.map.get(key) ?? 0;
						},
						set(_, key2: string | symbol, value: number) {
							const k2 = Number(key2);
							if (!Number.isFinite(k2)) throw new TypeError('Key must be a number');
							const key = target._getKey(k1, k2);
							target.map.set(key, value);
							return true;
						}
					}
				);
			}
		});
	}

	private _getKey(a: number, b: number): number {
		return a * 1_000_000 + b;
	}
}
