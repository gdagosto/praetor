<script lang="ts">
	import '$lib/db/db.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge';

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
		{#each stTournament.standings.current as standing, i}
			{@const player = stPlayers.players.current.find((p) => p.id === standing.playerId)}
			<Card.Root>
				<Card.Header class='flex-row justify-between pt-4 pr-4 align-middle'>
					<Card.Title class='text-lg'>{player?.fullName}</Card.Title>
					{#if standing.placement}
						<Badge variant="outline" class='rounded-md'>{i+1}º</Badge>
					{/if}
					
				</Card.Header>
				<Card.Content class='flex justify-around'>
					<div class='flex flex-col align-middle text-center'>
						<span class='font-medium text-2xl'>{standing.gw}</span>
						<h3 class='text-sm'>GW</h3>
					</div>
					<div class='flex flex-col align-middle text-center'>
						<span class='font-medium text-2xl'>{standing.vp}</span>
						<h3 class='text-sm'>VP</h3>
					</div>
					<div class='flex flex-col align-middle text-center'>
						<span class='font-medium text-2xl'>{standing.tp}</span>
						<h3 class='text-sm'>TP</h3>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</ScrollArea>
