<script lang="ts">
	import '$lib/db/db.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import Autocomplete from '$lib/components/autocomplete/autocomplete.svelte';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { Button } from '$lib/components/ui/button';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import { PlayerEditDialog } from '$lib/components/player-edit-dialog';

	$inspect('STANDINGS', stTournament.standings.current);
	$inspect('PLAYER_IDS', stPlayers.ids);
	$inspect('PLAYERS', stPlayers.players.current);

	let playerEditOpen = $state(false);
	let playerEditId = $state(-1);

	function onNewPlayerSubmit(id: number) {
		console.debug('NEW_PLAYER_SUBMIT', id);
		stTournament.addPlayer(id);
	}

	function onPlayerEdit(id: number) {
		console.debug('ON_PLAYER_EDIT',id);
		playerEditId = id;
		playerEditOpen = true;
	}
</script>

<ScrollArea class="relative h-full flex-1">
	<div class="bg-accent absolute top-0 left-0 h-10 w-full"></div>
	<grid class="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 p-2 pl-4 pb-1">
		<div class="sticky top-2 z-10 text-left font-semibold">{m.players_table_player_header()}</div>
		<div class="sticky top-2 z-10 text-center font-semibold">{m.players_table_id_header()}</div>
		<div class="sticky top-2 z-10 text-center font-semibold"></div>
		<div class="sticky top-10 z-10 col-span-3 mx-[-20px] mt-1 mb-2 border-b-1"></div>
		{#each stPlayers.players.current as player}
			<div class="truncate">{player.fullName}</div>
			<div class="text-center">{player.id}</div>
			<div>
				<Button onclick={() => onPlayerEdit(player.id)} variant="ghost" class="flex h-8 w-8 p-0">
					<Ellipsis />
				</Button>
			</div>
			<div class="col-span-3 mx-[-20px] my-1 border-b-1 last:hidden"></div>
		{/each}
	</grid>
</ScrollArea>

<footer class="flex w-full flex-col border-t-1 p-4">
	<Autocomplete placeholder={m.add_player_input_name_placeholder()} onsuccess={onNewPlayerSubmit} baseClass={buttonVariants({ variant: 'default' })}>
		{m.add_player_title()}
	</Autocomplete>
</footer>

<PlayerEditDialog bind:open={playerEditOpen} id={playerEditId}/>
