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

<ScrollArea class="h-full flex-1 relative">
	<div class='absolute top-0 left-0 w-full h-10 bg-background border-t-1'></div>
	<grid class="grid grid-cols-[30px_1fr_30px_30px_30px] gap-x-2 p-2 align-middle ">
		<div class="sticky top-2 z-10 col-span-2 text-left font-semibold">Jogador</div>
		<div class="sticky top-2 z-10 text-center font-semibold">GW</div>
		<div class="sticky top-2 z-10 text-center font-semibold">VP</div>
		<div class="sticky top-2 z-10 text-center font-semibold">TP</div>
		<div class="sticky top-10 z-10 col-span-5 mx-[-20px] my-2 border-b-1"></div>
		{#each stTournament.standings.current as standing, i}
			{@const player = stPlayers.players.current.find((p) => p.id === standing.playerId)}

			<div class="w-2">
				{#if standing.placement}
					{standing.placement}°
				{/if}
			</div>
			<div class="truncate">{player?.fullName}</div>
			<div class="text-center">{standing.gw}</div>
			<div class="text-center">{standing.vp}</div>
			<div class="text-center">{standing.tp}</div>
			<div
				class="col-span-5 mx-[-20px] my-2 border-b-1
			 "
			></div>
		{/each}
	</grid>

	<table class="w-full">
		<thead>
			<tr>
				<th class="text-left"> Jogador </th>
				<th> GW </th>
				<th> VP </th>
				<th> TP </th>
			</tr>
		</thead>
	</table>

	<div class="flex flex-col gap-4">
		{#each stTournament.standings.current as standing, i}
			{@const player = stPlayers.players.current.find((p) => p.id === standing.playerId)}
			<Card.Root>
				<Card.Header class="flex-row justify-between pt-4 pr-4 align-middle">
					<Card.Title class="text-lg">{player?.fullName}</Card.Title>
					{#if standing.placement}
						<Badge variant="outline" class="rounded-md">{i + 1}º</Badge>
					{/if}
				</Card.Header>
				<Card.Content class="flex justify-around">
					<div class="flex flex-col text-center align-middle">
						<span class="text-2xl font-medium">{standing.gw}</span>
						<h3 class="text-sm">GW</h3>
					</div>
					<div class="flex flex-col text-center align-middle">
						<span class="text-2xl font-medium">{standing.vp}</span>
						<h3 class="text-sm">VP</h3>
					</div>
					<div class="flex flex-col text-center align-middle">
						<span class="text-2xl font-medium">{standing.tp}</span>
						<h3 class="text-sm">TP</h3>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</ScrollArea>
