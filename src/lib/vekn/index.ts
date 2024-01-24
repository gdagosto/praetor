import Dexie from 'dexie';

import type { Dict, IDbPlayer } from '$lib/types/index.js';

const THROTTLE_UPDATE_RATE = 60 * 1000;

class VeknDB extends Dexie {
	rankings!: Dexie.Table<IDbPlayer, number>;

	constructor() {
		super('vekn');
		this.version(1).stores({
			rankings: 'id'
		});
	}
}

class PlayerDB {
	db: VeknDB;

	constructor() {
		this.db = this.openDB();
	}

	openDB() {
		const db = new VeknDB();
		db.open();
		return db;
	}

	async populatePlayerDB() {
		/** Only update player DB if it has no data. Otherwise, don't do anything */

		const hasData = (await this.db.rankings.count()) > 0;
		if (hasData) return;

		this.updatePlayerDB();
	}

	async forceUpdatePlayerDB() {
		/** Updates player DB. If you need to manually update, call this function */

		const lastUpdateTime = parseInt(window.localStorage.getItem('lastDbUpdate') ?? '0');
		const timeNow = Date.now();
		const timeElapsed = timeNow - lastUpdateTime;
		if (timeElapsed < THROTTLE_UPDATE_RATE) return;

		window.localStorage.setItem('lastDbUpdate', timeNow.toString());
		this.updatePlayerDB();
	}

	async updatePlayerDB() {
		/** Do not call this function from outside */
		const { db } = this;
		const veknURL = 'https://www.vekn.net/api/index.php?option=com_api&app=vekn&resource=ranking';
		const url = 'https://corsproxy.io/?' + encodeURIComponent(veknURL);
		fetch(url)
			.then((response) => {
				if (!response.ok) throw new Error(`HTTP error ${response.status}`);
				return response.json();
			})
			.then(async (data) => {
				const players = data.data.players;
				await db.transaction('rw', db.rankings, async () => {
					await db.rankings.clear();
					players.forEach((player: Dict<string>) => {
						db.rankings.add({
							id: parseInt(player.veknid),
							firstName: player.firstname,
							lastName: player.lastname,
							country: player.country,
							ratingConstructed: parseInt(player.rtp_constructed),
							ratingLimited: parseInt(player.rtp_limited)
						});
					});
				});
			});
	}

	async getPlayerDataByID(id: number) {
		return this.db.rankings.get(id);
	}

	async getPlayersByID(ids: number): Promise<IDbPlayer>;
	async getPlayersByID(ids: number[]): Promise<IDbPlayer[]>;
	async getPlayersByID(ids: number | number[]): Promise<IDbPlayer | IDbPlayer[] | undefined> {
		const { db } = this;

		if (typeof ids === 'number') return this.getPlayerDataByID(ids);
		return await db.rankings.filter((player) => ids.includes(player.id)).toArray();
	}

	async getPlayersAutocomplete() {
		/** Returns data to create an autocomplete for players,
		 * including vekn id and playerName */
		throw new Error('not implemented');
	}
}

export const playerDB = new PlayerDB();
