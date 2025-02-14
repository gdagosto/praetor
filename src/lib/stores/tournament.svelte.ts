import { db, type IDbStandings, type IDbTables, type IDbTournaments } from '$lib/db/db.svelte';
import { stateQuery } from '$lib/utils/stateQuery.svelte';

const INITIAL_TOURNAMENT = {
	id: 0,
	name: '',
	hasFinals: false,
	rounds: 0
};

class StTournament {
	id = $state<number>(0);
	info = stateQuery<IDbTournaments>(
		INITIAL_TOURNAMENT,
		async () => {
			const result = await db.tournaments.get(this.id);
			return result ?? INITIAL_TOURNAMENT;
		},
		() => [this.id]
	);

	standings = stateQuery<IDbStandings[]>(
		[],
		() => db.standings.where('tournamentId').equals(this.id).toArray(),
		() => [this.id]
	);

	tables = stateQuery<IDbTables[]>(
		[],
		() => db.roundTables.where('tournamentId').equals(this.id).toArray(),
		() => [this.id]
	);
}

export const stTournament = new StTournament();

export const stTournaments = stateQuery<IDbTournaments[]>([], () => db.tournaments.toArray());
