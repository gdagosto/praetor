<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import { cn, isDesktop } from '$lib/utils/index.js';
	import { Tween } from 'svelte/motion';

	const tween = new Tween(3, { delay: 0, duration: 3000 });

	interface Props {
		open: boolean;
		onDelete: () => void;
	}

	let { open = $bindable(false), onDelete: onDeleteCallback }: Props = $props();

	function onDelete() {
		open = false;
		onDeleteCallback();
	}

	$effect(() => {
		console.log('effect', open);
		if (open) dialogOpened();
	});

	function dialogOpened() {
		console.log('dialogOpened');
		tween.set(3, { duration: 0 });
		tween.set(0, { duration: 3000 });
	}
</script>

{#if isDesktop.current}
	<Dialog.Root bind:open>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{@render title()}</Dialog.Title>
				<Dialog.Description class="whitespace-pre-wrap">
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
				<Drawer.Description class="whitespace-pre-wrap">
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
	{m.round_delete_dialog_title()}
{/snippet}

{#snippet description()}
	{m.round_delete_dialog_description()}
{/snippet}

{#snippet content(drawer = false)}
	<form class={cn('grid items-start gap-4', drawer && 'px-4')}>
		<Button type="button" variant="destructive" onclick={onDelete} disabled={tween.current > 0}>
			{m.round_delete_dialog_button()}
			{#if tween.current > 0}
				{`(${Math.ceil(tween.current)}s)`}
			{/if}
		</Button>
	</form>
{/snippet}
