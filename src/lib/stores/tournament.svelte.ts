import {
	db,
	type IDbPlayer,
	type IDbStanding,
	type IDbTable,
	type IDbTournament
} from '$lib/db/db.svelte';
import { stateQuery } from '$lib/utils/stateQuery.svelte';

const INITIAL_TOURNAMENT = {
	id: 0,
	name: '',
	hasFinals: false,
	rounds: 0
};

class StTournament {
	id = $state<number>(0);
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
		() => db.standings.where('tournamentId').equals(this.id).toArray(),
		() => [this.id]
	);

	tables = stateQuery<IDbTable[]>(
		[],
		() => db.roundTables.where('tournamentId').equals(this.id).toArray(),
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
			status: ''
		});
	};

	addRoundTable = async (roundNum: number, tableNum: number, playerIds: number[]) => {
		// Check if the item exists

		const table = await db.roundTables.get({ tournamentId: this.id, roundNum, tableNum });
		const players = playerIds.map((id) => ({ vp: 0, playerId: id }));
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
