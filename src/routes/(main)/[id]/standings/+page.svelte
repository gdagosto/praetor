<script lang="ts">
	import '$lib/db/db.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import Autocomplete from '$lib/components/autocomplete/autocomplete.svelte';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	$inspect('STANDINGS', stTournament.standings.current);
	$inspect('PLAYER_IDS', stPlayers.ids);
	$inspect('PLAYERS', stPlayers.players.current);

	function onNewPlayerSubmit(id: number) {
		console.debug('NEW_PLAYER_SUBMIT', id);
		stTournament.addPlayer(id);
	}
</script>

<ScrollArea class="h-full flex-1 p-4">
	<div class="flex flex-col gap-4">
		{#each stTournament.standings.current as standing}
			{@const player = stPlayers.players.current.find((p) => p.id === standing.playerId)}
			<Card.Root>
				<Card.Header>
					<Card.Title>{player?.fullName}</Card.Title>
					<Card.Description>{standing.placement}</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>Card Content</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</ScrollArea>
