// db.ts
import type { ITournamentRawData } from '$lib/types';
import { veknApi } from '$lib/utils';
import Dexie, { type EntityTable } from 'dexie';

export type IDatabase = Dexie & {
	tournaments: EntityTable<IDbTournament, 'id'>;
	players: EntityTable<IDbPlayer, 'id'>;
	standings: EntityTable<IDbStanding, 'id'>;
	roundTables: EntityTable<IDbTable, 'id'>;
};

// Define tables
export interface IDbTournament {
	id: number;
	name: string;
	rounds: number;
	hasFinals: boolean;
}

export interface IDbPlayer {
	id: number;
	firstName: string;
	lastName: string;
	country: string;
	idText: string;
	fullName: string;
}

export interface IDbStanding {
	id: number;
	tournamentId: number;
	playerId: number;
	placement: number;
	gw: number;
	vp: number;
	tp: number;
	coinranking: number;
	status: 'winner' | 'finalist' | 'dq' | 'wd' | '';
}

export interface IDbTable {
	id: number;
	tournamentId: number;
	roundNum: number;
	tableNum: number;
	winnerId: number;
	players: Array<{
		playerId: number;
		vp: number;
		tp: number;
	}>;
}

export const db: IDatabase = new Dexie('praetor') as IDatabase;
// Schema declaration
db.version(1).stores({
	tournaments: 'id, name, rounds, hasFinals',
	players: '++id, firstName, lastName, country, idText, fullName',
	standings:
		'++id, &[tournamentId+playerId], tournamentId, playerId, placement, gw, vp, tp, coinranking, status',
	roundTables:
		'++id, &[tournamentId+roundNum+tableNum], tournamentId, roundNum, tableNum, winnerId, players'
});

db.open();

db.on('ready', async (rawDb) => {
	const db = rawDb as unknown as IDatabase;

	// Check if data is already filled
	const count = await db.players.count();
	console.debug('ON_READY_PLAYER_COUNT', count);

	if (count === 0) getVeknRankings(db as unknown as IDatabase);
});

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

export async function getVeknRankings(myDb: IDatabase = db) {
	console.debug('GET_VEKN_RANKINGS');
	const data = await veknApi('ranking');
	const players = data?.players;
	if (!players) {
		console.error('RELOAD_RANKINGS_MISSING_PLAYERS', data);
		return;
	}

	const dbPlayers = players.map((p: any) => ({
		id: Number(p.veknid),
		firstName: p.firstname,
		lastName: p.lastname,
		country: p.country,
		idText: p.veknid,
		fullName: `${p.firstname} ${p.lastname}`
	}));

	myDb.players.bulkPut(dbPlayers);
}
