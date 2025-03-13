<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { db, type IDbStanding, type IDbTable } from '$lib/db/db.svelte';

	type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

	let value = $state('');
	let file: File | undefined = $state();

	function onchange(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		file = e.currentTarget.files?.[0];
	}

	function onsubmit() {
		if (!file) return;
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			try {
				const data = JSON.parse(reader.result as string);

				const id = data.tournaments.id;

				if (data.tournaments) {
					db.tournaments.put(data.tournaments, id);
				}

				if (data.standings) {
					db.standings.where('tournamentId').equals(id).delete();
					data.standings.forEach((s: Optional<IDbStanding, 'id'>) => {
						delete s['id'];
						db.standings.add(s);
					});
				}

				if (data.roundTables) {
					db.roundTables.where('tournamentId').equals(id).delete();
					data.roundTables.forEach((s: Optional<IDbTable, 'id'>) => {
						delete s['id'];
						db.roundTables.add(s);
					});
				}

				goto(`${base}/${id}`);
			} catch {
				return;
			}
		});

		reader.readAsText(file, 'utf-8');
	}
</script>

<form {onsubmit}>
	<Input type="file" {onchange} bind:value />
	<Button type="submit">Submit</Button>
</form>
