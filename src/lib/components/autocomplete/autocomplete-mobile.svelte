<script lang="ts">
	import { Input, inputClasses } from '$lib/components/ui/input/index.js';
	import { db, type IDbPlayer } from '$lib/db/db.svelte';
	import { cn } from '$lib/utils/index.js';
	import { stateQuery } from '$lib/utils/stateQuery.svelte';
	import X from '@lucide/svelte/icons/x';
	import { tick } from 'svelte';
	import { Button } from '../ui/button';
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
	let buttonRef: HTMLButtonElement | null = $state(null);

	async function onOpen() {
		console.log('AUTOCOMPLETE_MOBILE_ON_OPEN');
		open = true;
		await tick();
		inputRef?.focus();
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
			return;
		}
		return selectPlayer(data.current[0]?.id);
	}

	function selectPlayer(id: number) {
		open = false;
		console.debug('SELECT_PLAYER', open);
		onsuccess(id);
		buttonRef?.focus();
	}

	$inspect('AUTOCOMPLETE_OPEN', open);
</script>

<Button bind:ref={buttonRef} onclick={onOpen}>{@render children()}</Button>

{#if open}
	<div class="bg-background fixed top-0 left-0 z-10 h-full w-full rounded-t-[0]">
		<form class="flex w-full items-center justify-between border-b-1 pl-4" onsubmit={onSubmit}>
			<Input
				{placeholder}
				tabindex={1}
				class="rounded-none border-none pl-0 focus-visible:ring-0"
				bind:value={inputData}
				bind:ref={inputRef}
				autofocus={true}
			/>

			<input type="submit" hidden />

			<button
				onclick={onClose}
				tabindex={2}
				type="button"
				class="ring-offset-background focus:ring-ring m-1 rounded-sm p-2 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
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
	</div>
{/if}

<style>
	:global(.animation-none) {
		animation: none !important;
	}

	:global(.hideHandle > div:first-child) {
		display: none;
	}
</style>
