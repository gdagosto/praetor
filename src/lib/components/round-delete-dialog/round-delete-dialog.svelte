<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import { cn, isDesktop } from '$lib/utils';

	interface Props {
		open: boolean;
		onDelete: () => void;
	}

	let { open = $bindable(false), onDelete: onDeleteCallback }: Props = $props();

	function onDelete() {
		open = false;
		onDeleteCallback();
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
		<Button type="button" variant="destructive" onclick={onDelete}>
			{m.round_delete_dialog_button()}
		</Button>
	</form>
{/snippet}
