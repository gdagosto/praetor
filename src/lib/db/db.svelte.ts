// db.ts
import { stPages } from '$lib/stores/sidebar.svelte';
import { stTournament } from '$lib/stores/tournament.svelte';
import Dexie, { type EntityTable } from 'dexie';

export type IDatabase = Dexie & {
	info: EntityTable<IDbInfo, 'id'>;
};

export interface IDbInfo {
	id: number;
	key: string;
	value: string;
}

export let db: IDatabase | undefined;

function versionDb(id: number) {
	// No need to do any checks.
	// Dexie checks if the database exists or not, and creates it accordingly
	const myDb = new Dexie(`praetor${id}`) as IDatabase;

	// Schema declaration
	myDb.version(1).stores({
		info: 'key, value'
	});

	return myDb;
}

export function createDatabase(data: typeof stTournament.info) {
	// If there is no data, return
	if (!data) return;

	// If the id is 0, no tournament is selected. Return
	if (data.id === 0) return;

	db = versionDb(data.id);
	db.on('populate', () => {
		console.log('dbPopulate');
		db?.info.bulkAdd([
			{
				key: 'name',
				value: data.name
			},
			{
				key: 'rounds',
				value: String(data.rounds)
			},
			{
				key: 'hasFinals',
				value: String(data.hasFinals)
			}
		]);
	});
	db.open();
}

export async function openDatabase(id: number) {
	console.log('OPEN_DATABASE', id);
	// If there is no data, return
	if (!id || id <= 0) return;

	try {
		db = versionDb(id);
		await db.open();

		const [name, hasFinals, rounds] = await Promise.all([
			db.info.get({ key: 'name' }).then((r) => r?.value),
			db.info.get({ key: 'hasFinals' }).then((r) => r?.value === 'true'),
			db.info.get({ key: 'rounds' }).then((r) => (r ? Number(r.value) : r))
		]);

		// TODO: Show an error message if it fails
		if (!name || !hasFinals || !rounds) {
			console.error(`Something didn't work!`, name, hasFinals, rounds);
			return;
		}

		stTournament.loadInfo({
			id,
			name,
			hasFinals,
			rounds
		});

		stPages.setRounds(rounds, hasFinals);
	} catch (err) {
		console.error(err);
	}
}
