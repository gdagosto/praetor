<script lang="ts">
	import { Combobox } from '$lib/components/combobox';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const tables = $state(stTournament.tables.current.filter((t) => t.roundNum === data.roundNumber));
	const options = stPlayers.players.current.map((p) => ({
		value: String(p.id),
		label: p.fullName
	}));

	let value = $state('');

	$inspect('tables', tables);


</script>

<Combobox {options} bind:value></Combobox>
