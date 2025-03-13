<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { DragNDrop } from '$lib/components/drag-n-drop/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import type { IDbStanding } from '$lib/db/db.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { stFinals } from '$lib/stores/finals.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';

	let currentFinalists = $state(stFinals.finalists.current);

	function onSaveBasicList(e: IDbStanding[]) {
		console.log('onSaveBasicList', e);
		currentFinalists = e;
	}

	function generateFinalRoundTable() {
		stTournament
			.addRoundTable(
				100,
				1,
				currentFinalists.map((s) => s.playerId)
			)
			.then(() => {
				goto(`${base}/${stTournament.id}/rounds/finals`);
			});
	}

	if (stFinals.finalists.current.length === 0) {
		tick().then(() => {
			goto(`${base}/${stTournament.id}/rounds/finals`);
		});
	}
</script>

{#if currentFinalists.length > 0}
	<div class="flex h-full w-full flex-col justify-center p-8">
		<h2 class=" text-lg font-medium">{m.finals_placements_title()}</h2>
		<h3 class="text-muted-foreground mb-8 text-sm">
			{m.finals_placements_description()}
		</h3>
		<DragNDrop
			listName="Basic list"
			items={currentFinalists}
			onFinalize={(e) => onSaveBasicList(e)}
			group="basic-list"
			class="flex w-full flex-col gap-2"
		>
			{#snippet children(item, idx)}
				{@const player = stPlayers.getById(item.playerId)}
				<div class={cn(buttonVariants({ variant: 'outline' }), 'flex w-full justify-between')}>
					<span>{player?.fullName}</span>
					<span>{idx + 1}º</span>
				</div>
			{/snippet}
		</DragNDrop>
	</div>

	<footer class="mt-auto flex w-full justify-center p-8">
		<Button class="grow" onclick={generateFinalRoundTable}>{m.confirm()}</Button>
	</footer>
{/if}
