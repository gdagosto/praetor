<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import { cn, isDesktop } from '$lib/utils';
	import type { IDbTable } from '$lib/db/db.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { stTournament } from '$lib/stores/tournament.svelte';

	interface Props {
		open: boolean;
		table: IDbTable;
	}

	let { open = $bindable(false), table }: Props = $props();
	let vps = table.players.map((p) => p.vp);
	let fulls = $state(vps.map((vp) => String(Math.floor(vp))));
	let halfs = $state(vps.map((vp) => vp % 1 === 0.5));

	$effect(() => {
		console.debug('ON_EFFECT');
		vps = table.players.map((p) => p.vp);
		fulls = vps.map((vp) => String(Math.floor(vp)));
		halfs = vps.map((vp) => vp % 1 === 0.5);
	});

	function onsubmit() {
		console.debug('ON_SUBMIT');

		let roundPlayers: IDbTable['players'] = [];

		// Figure out each player VPs
		for (let i = 0, iMax = table.players.length; i < iMax; i++) {
			const player = table.players[i];
			roundPlayers.push({
				playerId: player.playerId,
				vp: Number(fulls[i]) + (halfs[i] ? 0.5 : 0),
				tp: 0
			});
		}

		// Now, figure out how many tps each player got
		const playerPos = roundPlayers.map((p, idx) => ({ ...p, idx })).sort((a, b) => b.vp - a.vp);

		// Start the tp array based on number of players
		let tps: number[] = [];
		const tableSize = roundPlayers.length;
		if (tableSize === 4) tps = [60, 48, 24, 12];
		if (tableSize === 5) tps = [60, 48, 36, 24, 12];

		// Group players into respective table results, so we can figure out
		let lastVP = roundPlayers[0].vp;
		let lastTP = 0;
		let positionGroups: Array<{ players: number[]; tp: number }> = [];
		let lastPlayers: number[] = [];
		let winnerId = 0;

		for (let i = 0, iMax = playerPos.length; i < iMax; i++) {
			const player = playerPos[i];
			const tp = tps[i];

			if (lastVP !== player.vp) {
				positionGroups.push({ tp: lastTP, players: structuredClone(lastPlayers) });
				lastTP = 0;
				lastVP = player.vp;
				lastPlayers = [];
			}

			lastTP += tp;
			lastPlayers.push(player.idx);
		}

		positionGroups.push({ tp: lastTP, players: lastPlayers });

		positionGroups.forEach((posGroup) => {
			// For each player in a position group, divide the TPs equally
			const tp = posGroup.tp / posGroup.players.length;
			posGroup.players.forEach((pIdx) => {
				roundPlayers[pIdx].tp = tp;
			});
		});

		// Figure out if there was a winner
		if (table.roundNum === 100) {
			// If it's the finals, you need to take in consideration player rankings

			// Get the first position group,
			const initial = stTournament.getStandingByPlayerId(positionGroups[0].players[0]);
			const winner = positionGroups[0].players.reduce((winner, cur) => {
				const player = stTournament.getStandingByPlayerId(cur);
				if (player.placement < winner.placement) return player;
				return winner;
			}, initial);

			winnerId = winner.playerId;
		} else {
			// Else, just check if the first player got full tps, and 2 or more vps
			if (roundPlayers[playerPos[0].idx].tp === tps[0] && roundPlayers[playerPos[0].idx].vp >= 2) {
				winnerId = playerPos[0].playerId;
			}
		}

		// Recompute vps based on fulls and halfs
		stTournament.reportRoundTable(table.roundNum, table.tableNum, roundPlayers, winnerId);

		open = false;
	}

	function onValueChange(value: string, idx: number) {
		console.debug('ON_VALUE_CHANGE', value, idx);
		const numValue = Number(value);
		if (isNaN(numValue)) return;
		fulls[idx] = value;
	}

	$inspect(fulls);
	$inspect(halfs);
</script>

{#if isDesktop.current}
	<Dialog.Root bind:open>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{@render title()}</Dialog.Title>
				<Dialog.Description>
					{@render description()}
				</Dialog.Description>
			</Dialog.Header>
			{@render content()}
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>{@render title()}</Drawer.Title>
				<Drawer.Description>
					{@render description()}
				</Drawer.Description>
			</Drawer.Header>

			{@render content(true)}
			<Drawer.Footer class="pt-4">
				<Drawer.Close class={buttonVariants({ variant: 'secondary' })}
					>{m.drawer_cancel()}</Drawer.Close
				>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}

{#snippet title()}
	{m.table_report_dialog_title({ tableNum: table.tableNum })}
{/snippet}

{#snippet description()}
	{m.table_report_dialog_description()}
{/snippet}

{#snippet content(drawer = false)}
	<form class={cn('grid items-start gap-8', drawer && 'px-4')}>
		{#each table.players as tablePlayer, idx}
			{@const player = stPlayers.getById(tablePlayer.playerId)}
			<div class="flex flex-col items-stretch gap-2">
				<div class="flex w-full items-center justify-start gap-2 px-2">
					<span class="grow-0 font-medium">
						{player?.fullName}
					</span>
					<Label for="{tablePlayer.playerId}-chk" class="ml-auto">+0.5</Label>
					<Checkbox id="{tablePlayer.playerId}-chk" bind:checked={halfs[idx]} />
				</div>
				<ToggleGroup.Root
					type="single"
					class="bg-muted flex h-11 w-full rounded-md p-1"
					value={fulls[idx]}
					onValueChange={(v) => onValueChange(v, idx)}
				>
					{@render toggleItem('0')}
					{@render toggleItem('1')}
					{@render toggleItem('2')}
					{@render toggleItem('3')}
					{@render toggleItem('4')}
					{#if table.players.length === 5}
						{@render toggleItem('5')}
					{/if}
				</ToggleGroup.Root>
			</div>
		{/each}
		<Button type="submit" onclick={onsubmit}>{m.table_report_dialog_button_submit()}</Button>
	</form>
{/snippet}

{#snippet toggleItem(value = '0')}
	<ToggleGroup.Item
		{value}
		class="ring-offset-background focus-visible:ring-ring data-[state=on]:bg-background data-[state=on]:text-foreground inline-flex h-9 flex-auto basis-1 items-center justify-center rounded-sm px-3 py-1 text-sm font-medium whitespace-nowrap text-zinc-600 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:shadow dark:text-zinc-200"
	>
		{value}
	</ToggleGroup.Item>
{/snippet}
