<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { DragNDrop } from '$lib/components/drag-n-drop';
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import type { IDbStanding } from '$lib/db/db.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { stFinals } from '$lib/stores/finals.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import { cn } from '$lib/utils';
	import { shuffle } from '$lib/utils/random.js';
	import Check from '@lucide/svelte/icons/check';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { tick } from 'svelte';

	let page = $state(0);
	let maxPage = $derived(stFinals.ties.length);

	let hasNextPage = $derived(page < maxPage - 1);
	let hasPreviousPage = $derived(page > 0);

	function previousPage() {
		if (page > 0) page--;
	}

	function nextPage() {
		if (page < maxPage - 1) page++;
	}

	function onSaveBasicList(e: IDbStanding[]) {
		console.debug('ON_SAVE', $state.snapshot(stFinals.ties[page].players), e);
		stFinals.ties[page].players = e;
		console.debug('ON_SAVE', $state.snapshot(stFinals.ties[page].players));
	}

	function random() {
		stFinals.ties[page].players = shuffle(stFinals.ties[page].players);
		if (hasNextPage) {
			nextPage();
		} else {
			finish();
		}
	}

	function finish() {
		stFinals.finalizeTiebreakers();
		goto(`${base}/${stTournament.id}/rounds/finals/placements`);
	}

	if (stFinals.ties.length === 0) {
		tick().then(() => {
			goto(`${base}/${stTournament.id}/rounds/finals`);
		});
	}
</script>

{#if stFinals.ties.length > 0}
	<div class="flex h-full w-full flex-col justify-center p-8">
		<h2 class=" text-lg font-medium">
			{m.finals_tiebreaker_title({ current: stFinals.ties[page].placement })}
		</h2>
		<h3 class="text-muted-foreground mb-2 text-sm whitespace-pre-wrap">
			{m.finals_tiebreaker_description_1()}
		</h3>
		<h3 class="text-muted-foreground mb-8 text-sm whitespace-pre-wrap">
			{m.finals_tiebreaker_description_2()}
		</h3>

		<div class="flex w-full flex-col gap-2">
			<DragNDrop
				listName="Basic list"
				items={stFinals.ties[page].players}
				onFinalize={(e) => onSaveBasicList(e)}
				group="basic-list"
				class="flex w-full flex-col gap-2"
			>
				{#snippet children(item, idx)}
					{@const player = stPlayers.getById(item.playerId)}
					<div class={cn(buttonVariants({ variant: 'outline' }), 'flex w-full justify-between')}>
						<span>{player?.fullName}</span>
						<span>{item.placement + idx}º</span>
					</div>
				{/snippet}
			</DragNDrop>

			<Button onclick={random} class="mt-8">{m.finals_tiebreaker_random()}</Button>
		</div>
	</div>

	<footer class="mt-auto flex w-full justify-between p-4">
		<Button
			variant="outline"
			class="h-8 w-8 p-0"
			disabled={!hasPreviousPage}
			onclick={previousPage}
		>
			<ChevronLeft />
		</Button>
		<div class="flex w-[100px] items-center justify-center text-sm font-medium">
			{m.finals_tiebreaker_page({ current: page + 1, max: maxPage })}
		</div>

		{#if hasNextPage}
			<Button variant="outline" class="h-8 w-8 p-0" onclick={nextPage}>
				<ChevronRight />
			</Button>
		{:else}
			<Button class="h-8 w-8 p-0" onclick={finish}>
				<Check />
			</Button>
		{/if}
	</footer>
{/if}
