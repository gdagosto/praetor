<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { stLocal } from '$lib/stores/local.svelte';
	import { tick } from 'svelte';

	$effect(() => {
		if (!stLocal.current) return;
		const tournamentId = stLocal.current.tournamentId;

		if (tournamentId === 0) {
			goto(`${base}/import/vekn`);
		} else {
			tick().then(() => {
				goto(`${base}/${tournamentId}`);
			});
		}
	});
</script>

Carregando...
