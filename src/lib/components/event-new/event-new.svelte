<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import { cn, isDesktop } from '$lib/utils';

	let open = false;

	function onImportVekn() {
		goto(`${base}/import/vekn`);
	}
</script>

{#if isDesktop.current}
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
			{@render title()}
		</Dialog.Trigger>
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
		<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>{@render title()}</Drawer.Trigger
		>
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
	{m.add_event_title()}
{/snippet}

{#snippet description()}
	{m.add_event_description()}
{/snippet}

{#snippet content(drawer = false)}
	<form class={cn('grid items-start gap-4', drawer && 'px-4')}>
		<Button onclick={onImportVekn}>{m.add_event_button_import_vekn()}</Button>
		<Button disabled>{m.add_event_button_import_praetor()}</Button>
	</form>
{/snippet}
