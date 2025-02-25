<script lang="ts">
	import '$lib/db/db.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

	$inspect('STANDINGS', stTournament.standings.current);
	$inspect('PLAYER_IDS', stPlayers.ids);
	$inspect('PLAYERS', stPlayers.players.current);
</script>

<ScrollArea class="relative h-full flex-1">
	<div class="bg-accent absolute top-0 left-0 h-10 w-full"></div>
	<grid class="grid grid-cols-[30px_1fr_30px_30px_30px] gap-x-2 p-2 items-center">
		<div class="sticky top-2 z-10 text-left font-semibold"></div>
		<div class="sticky top-2 z-10 text-left font-semibold">{m.standings_table_player_header()}</div>
		<div class="sticky top-2 z-10 text-center font-semibold">{m.standings_table_gw_header()}</div>
		<div class="sticky top-2 z-10 text-center font-semibold">{m.standings_table_vp_header()}</div>
		<div class="sticky top-2 z-10 text-center font-semibold">{m.standings_table_tp_header()}</div>
		<div class="sticky top-10 z-10 col-span-5 mx-[-20px] my-2 border-b-1"></div>
		{#each stTournament.standings.current as standing, i}
			{@const player = stPlayers.players.current.find((p) => p.id === standing.playerId)}

			<div class="w-2">
				{#if standing.status}
					{standing.status.length > 2 ? standing.status.slice(0, 1) : standing.status}
				{:else if standing.placement}
					{standing.placement}°
				{/if}
			</div>
			<div class="truncate">{player?.fullName.trim() || `VEKN:${player?.id}`}</div>
			<div class="text-center">{standing.gw}</div>
			<div class="text-center">{standing.vp}</div>
			<div class="text-center">{standing.tp}</div>
			<div class="col-span-5 mx-[-20px] my-2 border-b-1 last:hidden"></div>
		{/each}
	</grid>
</ScrollArea>
