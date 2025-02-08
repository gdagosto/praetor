// db.ts
import { stTournament } from '$lib/stores/tournament.svelte';
import Dexie, { type EntityTable } from 'dexie';

type IDatabase = Dexie & {
	info: EntityTable<
		IDbInfo,
		'id' // primary key "id" (for the typings only)
	>;
};

interface IDbInfo {
	id: number;
	key: string;
	value: string;
}

let db: IDatabase | undefined;

const cleanup = $effect.root(() => {
	$effect(() => {
		console.log('id:', stTournament.info.id);
		if (!stTournament) return;
		console.log('id:2', stTournament.info.id);
		db = new Dexie(`t${stTournament.info.id}`) as IDatabase;
		console.log('id3', db);

		// Schema declaration:
		db.version(1).stores({
			info: '++id, key, value' // primary key "id" (for the runtime!)
		});
		console.log('id4');

		db.on('populate', () => {
			console.log('dbPopulate');
			db?.info.bulkAdd([
				{
					key: 'name',
					value: stTournament.info.name
				},
				{
					key: 'rounds',
					value: String(stTournament.info.rounds)
				},
				{
					key: 'hasFinals',
					value: String(stTournament.info.hasFinals)
				}
			]);
		});
	});
});

export type { IDbInfo };
export { db };
