<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { stFinals } from '$lib/stores/finals.svelte';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import Check from 'lucide-svelte/icons/check';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import { shuffle } from '$lib/utils/random.js';

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

	function moveToTop(idx: number) {
		const current = stFinals.ties[page].players;
		const removed = current.splice(idx, 1)[0];
		stFinals.ties[page].players = [removed, ...current];
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
		goto('placements');
	}

	if (stFinals.ties.length === 0) {
		tick().then(() => {
			goto('../finals');
		});
	}
</script>

{#if stFinals.ties.length > 0}
	<div class="flex h-full w-full flex-col items-center justify-center">
		<h2 class="mb-8">
			Desempate de {stFinals.ties[page].placement}º
		</h2>
		<div class="flex w-full flex-col gap-2 p-4">
			{#each stFinals.ties[page].players as standing, idx}
				{@const player = stPlayers.getById(standing.playerId)}
				<Button variant="outline" onclick={() => moveToTop(idx)} class="flex justify-between">
					<span>
						{player?.fullName}
					</span>
					<span>
						{standing.placement + idx}º
					</span>
				</Button>
			{/each}
			<Button onclick={random} class="mt-8">Random</Button>
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
			Empate {page + 1} de {maxPage}
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
