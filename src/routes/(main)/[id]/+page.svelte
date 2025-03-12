<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import '$lib/db/db.svelte';
	import { db, type IDbStanding, type IDbTable } from '$lib/db/db.svelte';
	import { stTournament, stTournaments } from '$lib/stores/tournament.svelte';
	import { veknReport } from '$lib/utils/report';
	import { importInto } from 'dexie-export-import';
	import { saveAs } from 'file-saver-es';

	type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

	let dataBlob: Blob;

	function finals() {
		console.log(veknReport());
	}

	async function exportData() {
		// Export tournaments table only
		const obj = {
			tournaments: $state.snapshot(stTournament.info.current),
			standings: $state.snapshot(stTournament.standings.current),
			roundTables: $state.snapshot(stTournament.tables.current)
		};

		const blob = new Blob([JSON.stringify(obj)]);
		dataBlob = blob;

		return;

		saveAs(blob, 'dexie-export.json');
	}

	function convertBlobToJSON(blob: Blob) {
		const url = URL.createObjectURL(blob);
		const xmlRequest = new XMLHttpRequest();
		xmlRequest.open('GET', url, false);
		xmlRequest.send();
		return JSON.parse(xmlRequest.responseText);
	}

	async function importData(blob: Blob) {
		const data = convertBlobToJSON(blob);

		// 1. Remove all data currently in the DB
		const id = data.tournaments.id;

		db.standings.where('tournamentId').equals(id).delete();
		data.standings.forEach((s: Optional<IDbStanding, 'id'>) => {
			delete s['id'];
			db.standings.add(s);
		});

		db.roundTables.where('tournamentId').equals(id).delete();
		data.roundTables.forEach((s: Optional<IDbTable, 'id'>) => {
			delete s['id'];
			db.roundTables.add(s);
		});

		// db.tournaments.put(data.tournaments, id);

		return;
	}
</script>

Oi

<Button onclick={finals}>Finals</Button>
<Button onclick={exportData}>Export</Button>
<Button onclick={() => importData(dataBlob)}>Import</Button>
