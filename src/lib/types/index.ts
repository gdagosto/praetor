export * from './bgPattern.js';
export * from './button.js';
export * from './modal.js';
export * from './nav.js';
export * from './player.js';
export * from './preferences.js';
export * from './round.js';
export * from './table.js';
export * from './tabs.js';
export * from './tourney.js';
export * from './header.js';

export type Dict<V> = Record<string | number | symbol, V>;
export interface IDbPlayer {
	country: string;
	firstName: string;
	lastName: string;
	ratingConstructed: number;
	ratingLimited: number;
	id: number;
}
