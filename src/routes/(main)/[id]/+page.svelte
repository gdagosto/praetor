<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import '$lib/db/db.svelte';
	import { db, type IDbStanding, type IDbTable } from '$lib/db/db.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import { veknReport } from '$lib/utils/report';
	import { veknApi } from '$lib/utils/vekn.js';
	import { saveAs } from 'file-saver-es';

	type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

	function finals() {
		const headers = new Headers();
		headers.append('Content-Type', 'text/plain');
		veknApi(`archon/${stTournament.id}`, {
			method: 'POST',
			body: veknReport(),
			headers
		});
	}

	async function exportData() {
		// Export tournaments table only
		const obj = {
			tournaments: $state.snapshot(stTournament.info.current),
			standings: $state.snapshot(stTournament.standings.current),
			roundTables: $state.snapshot(stTournament.tables.current)
		};

		const blob = new Blob([JSON.stringify(obj)]);

		saveAs(blob, `praetor-${stTournament.info.current.id}.json`);
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

<div class="flex flex-col gap-4 p-4">
	<Button onclick={exportData}>{m.tournament_info_export_button()}</Button>
	<Button onclick={finals}>{m.tournament_info_submit_vekn_button()}</Button>
</div>
