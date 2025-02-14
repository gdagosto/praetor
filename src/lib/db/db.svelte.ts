// db.ts
import type { ITournamentRawData } from '$lib/types';
import Dexie, { type EntityTable } from 'dexie';

export type IDatabase = Dexie & {
	tournaments: EntityTable<IDbTournaments, 'id'>;
	players: EntityTable<IDbPlayers, 'id'>;
	standings: EntityTable<IDbStandings, 'id'>;
	roundTables: EntityTable<IDbTables, 'id'>;
};

// Define tables
export interface IDbTournaments {
	id: number;
	name: string;
	rounds: number;
	hasFinals: boolean;
}

export interface IDbPlayers {
	id: number;
	firstName: string;
	lastName: string;
	country: string;
}

export interface IDbStandings {
	id: number;
	tournamentId: number;
	playerId: number;
	placement: number;
	gw: number;
	vp: number;
	tp: number;
	status: 'winner' | 'finalist' | 'dq' | 'wd';
}

export interface IDbTables {
	id: number;
	tournamentId: number;
	tableNum: number;
	winnerId: number;
	players: Array<{
		playerId: number;
		vp: number;
	}>;
}

export let db: IDatabase = new Dexie('praetor') as IDatabase;
// Schema declaration
db.version(1).stores({
	tournaments: 'id, name, rounds, hasFinals',
	players: '++id, firstName, lastName, country',
	standings: '++id, tournamentId, playerId, placement, gw, vp, tp, status',
	roundTables: '++id, tournamentId, tableNum, winnerId, players'
});

db.open();

export function addTournament(data: ITournamentRawData) {
	// If there is no data, return
	if (!data) return;

	// If the id is 0, no tournament is selected. Return
	if (data.event_id === 0) return;

	const [rounds, final] = data.rounds.split('R');

	db.tournaments.add({
		id: Number(data.event_id),
		name: data.event_name,
		rounds: Number(rounds),
		hasFinals: final === '+F'
	});
}
