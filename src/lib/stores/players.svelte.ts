import { db, type IDbPlayer } from '$lib/db/db.svelte';
import { stateQuery } from '$lib/utils/stateQuery.svelte';
import { stTournament } from './tournament.svelte';

class StPlayers {
	ids = $derived(stTournament.standings.current.map((standing) => standing.playerId).sort());

	players = stateQuery<IDbPlayer[]>(
		[],
		() => db.players.bulkGet(this.ids).then((players) => players.filter((p) => !!p)),
		() => [this.ids]
	);
}

export const stPlayers = new StPlayers();
