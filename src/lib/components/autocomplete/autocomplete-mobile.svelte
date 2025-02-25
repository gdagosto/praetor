<script lang="ts">
	import { Input, inputClasses } from '$lib/components/ui/input/index.js';
	import { cn } from '$lib/utils';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import X from 'lucide-svelte/icons/x';
	import { stateQuery } from '$lib/utils/stateQuery.svelte';
	import { db, type IDbPlayer } from '$lib/db/db.svelte';
	import type { IPropsAutocomplete } from './types';

	let {
		children,
		class: className,
		nested = false,
		autoOpen = false,
		placeholder = '',
		onsuccess = () => {},
		baseClass = cn(inputClasses, 'text-muted-foreground'),
		open = $bindable(autoOpen),
		...restProps
	}: IPropsAutocomplete = $props();

	let inputData: string = $state('');
	let inputRef: HTMLInputElement | null = $state(null);

	function onOpen() {
		console.log('AUTOCOMPLETE_MOBILE_ON_OPEN');
		open = true;
	}

	function onClose() {
		console.log('AUTOCOMPLETE_MOBILE_ON_CLOSE');
		open = false;
	}

	let data = stateQuery<IDbPlayer[]>(
		[],
		() => {
			return db.players
				.where('firstName')
				.startsWithIgnoreCase(inputData)
				.or('lastName')
				.startsWithIgnoreCase(inputData)
				.or('fullName')
				.startsWithIgnoreCase(inputData)
				.or('idText')
				.startsWith(inputData)
				.limit(20)
				.toArray();
		},
		() => [inputData]
	);

	$inspect('data', baseClass, className);

    function onSubmit(e: SubmitEvent) {
        e.preventDefault();
        const id = data.current[0]?.id;
        if (!id) {
            inputRef?.focus();
            return;
        }
        return selectPlayer(data.current[0]?.id)
    }

    function selectPlayer(id: number) {
        open = false;
        console.debug('SELECT_PLAYER', open)
		onsuccess(id);
	}

    function onOpenChange(val: boolean) {
        console.log('ON_OPEN_CHANGE', val)
        open = val;
        inputData = '';
    }


    $inspect('AUTOCOMPLETE_OPEN', open);


</script>

{#if nested}
	<Drawer.NestedRoot bind:open {onOpenChange} dismissible={false}>
		{@render dialogContent()}
	</Drawer.NestedRoot>
{:else}
	<Drawer.Root bind:open {onOpenChange} dismissible={false}>
		{@render dialogContent()}
	</Drawer.Root>
{/if}

{#snippet dialogContent()}
	<Drawer.Trigger onclick={onOpen} class={cn(baseClass, className)} {...restProps}>
		{@render children()}
	</Drawer.Trigger>
	<Drawer.Content class="animation-none hideHandle h-full rounded-t-[0]">
		<form
			class="flex w-full items-center justify-between border-b-1 pl-4"
			onsubmit={onSubmit}
		>
			<Input
				{placeholder}
                tabindex={1}
				class="rounded-none border-none pl-0 focus-visible:ring-0"
				bind:value={inputData}
				bind:ref={inputRef}
			/>

			<input type="submit" hidden />

			<button
				onclick={onClose}
                tabindex={2}
                type='button'
				class="ring-offset-background focus:ring-ring rounded-sm p-2 m-1 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
			>
				<X class="size-5" />
				<span class="sr-only">Close</span>
			</button>
		</form>

		<div class="w-full overflow-y-hidden">
			{#each data.current as item}
				<button
					onclick={() => selectPlayer(item.id)}
					class="flex min-h-10 w-full items-center justify-between border-b-1 pr-4 pl-4"
				>
					<div class="font-medium">{item.firstName} {item.lastName}</div>
					<div class="">{item.id}</div>
				</button>
			{/each}
		</div>
	</Drawer.Content>
{/snippet}

<style>
	:global(.animation-none) {
		animation: none !important;
	}

	:global(.hideHandle > div:first-child) {
		display: none;
	}
</style>
