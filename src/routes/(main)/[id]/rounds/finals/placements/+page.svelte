<script lang="ts">
	import { stFinals } from '$lib/stores/finals.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';

	$inspect('finalists', stFinals.finalists.current);
</script>

{#each stFinals.finalists.current as finalist}
	{@const player = stPlayers.getById(finalist.playerId)}
	{player?.fullName}
	<!-- content here -->
{/each}
