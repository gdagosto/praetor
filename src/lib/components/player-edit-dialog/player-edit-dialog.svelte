<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import type { IDbPlayer } from '$lib/db/db.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import { cn, isDesktop } from '$lib/utils/index.js';

	interface Props {
		open: boolean;
		id: IDbPlayer['id'];
	}

	let { open = $bindable(false), id }: Props = $props();

	let standing = $derived(stTournament.standings.current.find((p) => p.playerId === id));
	let player = $derived(stPlayers.players.current.find((p) => p.id === id));
	let status = $derived(standing?.status);
	let isInTable = $derived.by(() => {
		for (let i = 0, iMax = stTournament.tables.current.length; i < iMax; i++) {
			const table = stTournament.tables.current[i];
			if (table.players.find((p) => p.playerId === id)) {
				return true;
			}
		}
		return false;
	});

	function onRemove() {
		console.debug('ON_REMOVE', id);
		if (!standing) throw new Error('STANDINGS_PLAYER_NOT_FOUND');
		stTournament.removePlayerByStandingId(standing.id);
		open = false;
	}

	function onWithdraw() {
		console.debug('ON_WITHDRAW', id);
		if (!standing) throw new Error('STANDINGS_PLAYER_NOT_FOUND');
		stTournament.editPlayerStatusByStandingId(standing.id, 'wd');
		open = false;
	}

	function onDisqualify() {
		console.debug('ON_DISQUALIFY', id);
		if (!standing) throw new Error('STANDINGS_PLAYER_NOT_FOUND');
		stTournament.editPlayerStatusByStandingId(standing.id, 'dq');
		open = false;
	}

	function onRestitute() {
		console.debug('ON_RESTITUTE', id);
		if (!standing) throw new Error('STANDINGS_PLAYER_NOT_FOUND');
		stTournament.editPlayerStatusByStandingId(standing.id, '');
		stTournament.updateStandings();
		open = false;
	}
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
	{m.players_edit_dialog_title()} - {player?.fullName.trim() || `VEKN:${player?.id}`}
{/snippet}

{#snippet description()}
	{m.players_edit_dialog_description()}
{/snippet}

{#snippet content(drawer = false)}
	<form class={cn('grid items-start gap-4', drawer && 'px-4')}>
		{#if !isInTable}
			<Button type="button" variant="default" onclick={onRemove}>
				{m.players_edit_dialog_button_remove()}
			</Button>
		{:else}
			{#if status !== 'wd'}
				<Button type="button" variant="default" onclick={onWithdraw}>
					{m.players_edit_dialog_button_withdraw()}
				</Button>
			{/if}
			{#if status !== 'dq'}
				<Button type="button" variant="default" onclick={onDisqualify}>
					{m.players_edit_dialog_button_disqualify()}
				</Button>
			{/if}
		{/if}

		{#if status === 'dq' || status === 'wd'}
			<Button type="button" variant="default" onclick={onRestitute}>
				{m.players_edit_dialog_button_restitute()}
			</Button>
		{/if}
	</form>
{/snippet}
