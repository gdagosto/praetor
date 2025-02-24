<script lang="ts">
	import '$lib/db/db.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import Autocomplete from '$lib/components/autocomplete/autocomplete.svelte';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

	$inspect('STANDINGS', stTournament.standings.current);
	$inspect('PLAYER_IDS', stPlayers.ids);
	$inspect('PLAYERS', stPlayers.players.current);

	function onNewPlayerSubmit(id: number) {
		console.debug('NEW_PLAYER_SUBMIT', id);
		stTournament.addPlayer(id);
	}
</script>

<ScrollArea class="flex h-full flex-1 flex-col rounded-md border-1">
	{#each stPlayers.players.current as player}
		<div class="flex border-b-1 p-2 last:mb-8">{player.fullName} - {player.id}</div>
	{/each}
</ScrollArea>

<Autocomplete onsuccess={onNewPlayerSubmit} baseClass={buttonVariants({ variant: 'default' })}>
	{m.add_player_title()}
</Autocomplete>
