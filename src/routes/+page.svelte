<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import EventList from '$lib/components/event-list/event-list.svelte';
	import EventNew from '$lib/components/event-new/event-new.svelte';
	import { stTournaments } from '$lib/stores/tournament.svelte';

	$effect(() => {
		if (!stTournaments.current) return;
		if (stTournaments.current.length === 0) {
			goto(`${base}/import/vekn`);
		} else {
			goto(`${base}/${stTournaments.current[0].id}`)
		}
	});
</script>

Carregando...
