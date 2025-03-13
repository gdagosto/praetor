import { db, type IDbStanding, type IDbTable, type IDbTournament } from '$lib/db/db.svelte';
import { stateQuery } from '$lib/utils/stateQuery.svelte';
import { INACTIVE_STATUS } from '$lib/utils/status';
import { stLocal } from './local.svelte';

const INITIAL_TOURNAMENT = {
	id: 0,
	name: '',
	hasFinals: false,
	rounds: 0
};

class StTournament {
	#id = $state<number>(0);

	get id() {
		return this.#id;
	}

	set id(id: number) {
		this.#id = id;
		setTimeout(() => {
			stLocal.current.tournamentId = id;
		}, 100);
	}

	info = stateQuery<IDbTournament>(
		INITIAL_TOURNAMENT,
		async () => {
			const result = await db.tournaments.get(this.id);
			return result ?? INITIAL_TOURNAMENT;
		},
		() => [this.id]
	);

	standings = stateQuery<IDbStanding[]>(
		[],
		() => db.standings.where('tournamentId').equals(this.id).sortBy('placement'),
		() => [this.id]
	);

	tables = stateQuery<IDbTable[]>(
		[],
		() => db.roundTables.where('tournamentId').equals(this.id).toArray(),
		() => [this.id]
	);

	currentRound = stateQuery<number>(
		0,
		async () => {
			const data = await db.roundTables
				.where('tournamentId')
				.equals(this.id)
				.reverse()
				.sortBy('roundNum');
			if (data.length === 0) return 0;
			return data[0]['roundNum'];
		},
		() => [this.id]
	);

	addPlayer = async (playerId: number) => {
		// Check if the player exists
		const playerExists = await db.players.get(playerId);
		if (!playerExists) {
			console.log('PLAYER_DOESNT_EXIST');
			return;
		}

		// Check if this player is already on the tournament
		const playerAlreadyIn = await db.standings.get({ playerId: playerId, tournamentId: this.id });
		if (playerAlreadyIn) {
			console.log('PLAYER_ALREADY_IN');
			return;
		}

		db.standings.add({
			playerId,
			tournamentId: this.id,
			placement: 0,
			gw: 0,
			vp: 0,
			tp: 0,
			coinranking: 0,
			status: ''
		});
	};

	addRoundTable = async (roundNum: number, tableNum: number, playerIds: number[]) => {
		// Check if the item exists

		const table = await db.roundTables.get({ tournamentId: this.id, roundNum, tableNum });
		const players = playerIds.map((id) => ({ playerId: id, vp: 0, tp: 0 }));
		console.debug('ADD_ROUND_TABLE', table?.id, playerIds);

		if (table) {
			db.roundTables.update(table.id, {
				winnerId: 0,
				players
			});
		} else {
			db.roundTables.add({
				tournamentId: this.id,
				roundNum,
				tableNum,
				winnerId: 0,
				players
			});
		}
	};

	reportRoundTable = async (
		roundNum: number,
		tableNum: number,
		players: IDbTable['players'],
		winnerId: IDbTable['winnerId']
	) => {
		const table = await db.roundTables.get({ tournamentId: this.id, roundNum, tableNum });
		if (!table) return;

		console.log('tableId', table.id, 'players', players);

		db.roundTables.update(table.id, { winnerId, players });

		// Trigger a standings update

		if (roundNum === 100) {
			players.forEach((p) => {
				// Find standing id
				const standingId = stTournament.getStandingByPlayerId(p.playerId);
				const status: IDbStanding['status'] = p.playerId === winnerId ? 'winner' : 'finalist';
				if (p.playerId === winnerId) db.standings.update(standingId, { status });
			});

			return;
		}

		this.updateStandings();
	};

	deleteRound = async (roundNum: number) => {
		console.debug('DELETE_ROUND', roundNum);

		db.roundTables.where(['tournamentId', 'roundNum']).equals([this.id, roundNum]).delete();
	};

	updateStandings = async () => {
		// TODO: There's probably a smarter way to do this, but for now we redo everything all the time

		// Reset finalists
		db.standings.where('status').equals('winner').modify({ status: '' });
		db.standings.where('status').equals('finalist').modify({ status: '' });

		// Delete final table
		db.roundTables
			.where(['tournamentId', 'roundNum', 'tableNum'])
			.equals([this.id, 100, 1])
			.delete();

		// Recalculate standings, aggregating player GWs, VPs and TPs

		// Don't trust liveQueries, as they might is probably stale when this is called
		const standings = await db.standings.where('tournamentId').equals(this.id).toArray();
		const roundTables = await db.roundTables.where('tournamentId').equals(this.id).toArray();
		const playersById: Record<
			number,
			{
				id: IDbStanding['id'];
				vp: IDbStanding['vp'];
				gw: IDbStanding['gw'];
				tp: IDbStanding['tp'];
				placement: IDbStanding['placement'];
				coinranking: IDbStanding['coinranking'];
				status: IDbStanding['status'];
			}
		> = {};

		standings.forEach((s) => {
			playersById[s.playerId] = {
				id: s.id,
				gw: 0,
				vp: 0,
				tp: 0,
				placement: 0,
				coinranking: 0,
				status: s.status
			};
		});

		roundTables.forEach((roundTable) => {
			if (roundTable.winnerId) {
				playersById[roundTable.winnerId].gw += 1;
			}

			roundTable.players.forEach(({ playerId, vp, tp }) => {
				playersById[playerId].vp += vp;
				playersById[playerId].tp += tp;
			});
		});

		const placementDict: Record<number, number[]> = {};

		// Finally, update placement. To do so, we need to group players into groups based on vp, tp and gw
		Object.entries(playersById).forEach(([playerId, { gw, vp, tp, status }]) => {
			let rank = 0;
			if (!INACTIVE_STATUS.includes(status)) {
				rank = gw * 1_000_000 + vp * 1_000 + tp;
			}
			if (!placementDict[rank]) placementDict[rank] = [];
			placementDict[rank].push(Number(playerId));
		});

		// Now, we order the placement groups,
		// so we can get player placement in the tournament at the moment
		const placementGroups = Object.entries(placementDict).sort(
			(a, b) => Number(b[0]) - Number(a[0])
		);

		let placement = 1;
		for (let i = 0, iMax = placementGroups.length; i < iMax; i++) {
			const groupIds = placementGroups[i][1];
			const playerCount = groupIds.length;
			for (let j = 0, jMax = playerCount; j < jMax; j++) {
				const player = playersById[groupIds[j]];
				player.placement = placement;
			}
			placement += playerCount;
		}

		Object.values(playersById).forEach((standing) => {
			db.standings.update(standing.id, standing);
		});
	};

	updateCoinRanking = async (id: IDbStanding['id'], coinranking: IDbStanding['coinranking']) => {
		db.standings.update(id, { coinranking });
	};

	selectFinalists = async (ids: number[]) => {
		console.log('SELECT_FINALISTS', ids);

		// Reset finalists
		db.standings.where('status').equals('finalist').modify({ status: '' });

		const bulkUpdate = ids.map(
			(standingId, idx) =>
				({
					key: standingId,
					changes: {
						placement: idx < 5 ? idx + 1 : 6,
						status: idx < 5 ? 'finalist' : ''
					}
				}) as const
		);

		console.log(bulkUpdate);

		db.standings.bulkUpdate(bulkUpdate);
	};

	getStandingByPlayerId = (id: number) => {
		const player = this.standings.current.find((p) => p.playerId === id);
		if (!player) throw new Error(`Cant find standing for vekn ${id}`);
		return player;
	};

	removePlayerByStandingId = async (standingId: number) => {
		db.standings.delete(standingId);
	};

	editPlayerStatusByStandingId = async (
		standingId: IDbStanding['id'],
		status: IDbStanding['status']
	) => {
		db.standings.update(standingId, {
			status
		});
	};
}

export const stTournament = new StTournament();

export const stTournaments = stateQuery<IDbTournament[]>([], () => db.tournaments.toArray());
