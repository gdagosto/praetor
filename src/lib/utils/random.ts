// From: https://github.com/queviva/yacht-fisher
export const shuffle = <T extends unknown[]>(v: T, r = [...v]) =>
	v.map(() => r.splice(~~(Math.random() * r.length), 1)[0]) as T;
