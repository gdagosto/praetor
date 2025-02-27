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

	interface Props {
		open: boolean;
		table: IDbTable;
	}

	let { open = $bindable(false), table }: Props = $props();

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
			<Drawer.Footer class="pt-4"></Drawer.Footer>
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
		{#each table.players as tablePlayer}
			{@const player = stPlayers.getById(tablePlayer.playerId)}
			<div class="flex flex-col items-stretch gap-2">
				<div class="flex w-full items-center justify-start gap-2 px-2">
					<span class="grow-0 font-medium">
						{player?.fullName}
					</span>
					<Label for="{tablePlayer.playerId}-chk" class="ml-auto">+0.5</Label>
					<Checkbox id="{tablePlayer.playerId}-chk" />
				</div>
				<ToggleGroup.Root
					type="single"
					value={String(tablePlayer.vp)}
					class="flex w-full rounded-md bg-muted p-1 h-11"
				>
					{@render toggleItem('0')}
					{@render toggleItem('1')}
					{@render toggleItem('2')}
					{@render toggleItem('3')}
					{@render toggleItem('4')}
					{@render toggleItem('5')}
				</ToggleGroup.Root>
			</div>
		{/each}
	</form>
{/snippet}

{#snippet toggleItem(value = '0')}
	<ToggleGroup.Item
		{value}
		class="h-9 flex-auto basis-1 rounded-sm ring-offset-background focus-visible:ring-ring data-[state=on]:bg-background data-[state=on]:text-foreground inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:shadow text-zinc-600 dark:text-zinc-200"
	>
		{value}
	</ToggleGroup.Item>
{/snippet}

{#snippet toggleItemOld(value = '0')}
	<ToggleGroup.Item
		{value}
		class="flex-auto basis-1 rounded-sm data-[state=on]:bg-background data-[state=on]:font-bold"
	>
		{value}
	</ToggleGroup.Item>
{/snippet}