import Dexie from 'dexie';

import type { Dict, IDbPlayer } from '$lib/types/index.js';

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

	async updatePlayerDB() {
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
