<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { IButtonGroupItem } from '$lib/types';

	export let type: 'default' | 'color' = 'default';
	export let items: IButtonGroupItem[] = [];
	export let currentIdx: number = -1;
	export let value: string | number | symbol = '';

	const dispatch = createEventDispatcher();

	function onChange(idx: number) {
		value = items[idx].value ?? idx;
		dispatch('change', value);
	}

	function onValueChange(val: string | number | symbol) {
		const idx = items.findIndex((item) => item.value === val);
		currentIdx = idx;
	}
	$: onValueChange(value);
</script>

<div class={`btnGroupWrapper type-${type}`}>
	{#each items as { icon, text, disabled }, idx}
		<button
			on:click={() => onChange(idx)}
			class:iconNormal={icon && icon !== 'dot'}
			class:iconDot={icon === 'dot'}
			class:iconOnly={icon && !text}
			class:current={currentIdx === idx}
			{disabled}
		>
			{#if icon}
				{#if icon === 'dot'}
					<div class="dot" />
				{:else}
					<svelte:component this={icon} size={20} />
				{/if}
			{/if}
			{#if text}
				<span>{text}</span>
			{/if}
		</button>
	{/each}
</div>

<style lang="scss">
	.btnGroupWrapper {
		user-select: none;
		display: inline-flex;
		padding: var(--spacing-none, 0px);
		align-items: flex-start;
		gap: var(--spacing-none, 0px);
		// border-radius: var(--radius-md, 8px);
		// border: 1px solid var(--color-border-primary, #d0d5dd);

		box-shadow: var(--shadow-xs);

		box-sizing: border-box;
	}

	button {
		border: none;
		background-color: transparent;
		cursor: pointer;

		display: inline-flex;
		min-height: 40px;
		padding: var(--spacing-md, 8px) var(--spacing-xl, 16px);
		justify-content: center;
		align-items: center;
		gap: var(--spacing-md, 8px);
		background: var(--color-bg-primary, #fff);
		color: var(--color-fg-secondary);
		outline: none;

		border: 1px solid var(--color-border-primary, #d0d5dd);
		border-right-width: 0;

		&:first-child {
			border-top-left-radius: var(--radius-md, 8px);
			border-bottom-left-radius: var(--radius-md, 8px);
		}

		&:last-child {
			border-right-width: 1px;
			border-top-right-radius: var(--radius-md, 8px);
			border-bottom-right-radius: var(--radius-md, 8px);
		}

		&.current {
			background: var(--color-bg-active, #f9fafb);
		}

		&:hover {
			background: var(--color-bg-primary_hover, #f9fafb);
		}

		&:disabled {
			pointer-events: none;
			color: var(--color-fg-disabled);
			span {
				color: var(--color-text-disabled, #667085);
			}
			.dot {
				background-color: var(--color-fg-disabled_subtle);
			}
		}

		&.iconNormal {
			padding: var(--spacing-md, 8px) var(--spacing-xl, 16px) var(--spacing-md, 8px) 14px;
		}

		&.iconDot {
			padding: var(--spacing-md, 8px) var(--spacing-xl, 16px);
		}

		&.iconOnly {
			padding: var(--spacing-md, 8px) var(--spacing-lg, 12px);
		}

		span {
			/* Text sm/Semibold */
			font-family: var(--textsm-semibold-font-family);
			font-size: var(--textsm-semibold-font-size);
			font-style: var(--textsm-semibold-font-style);
			font-weight: var(--textsm-semibold-font-weight);
			line-height: var(--textsm-semibold-line-height);
			color: var(--color-text-secondary, #344054);
		}
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background-color: var(--color-fg-success-secondary);
	}

	.type-color button {
		&:hover,
		&.current {
			color: var(--comp-colors-Buttons-secondary-color-button-secondary-color-fg);
			background: var(--comp-colors-Buttons-secondary-color-button-secondary-color-bg_hover);
			border-color: var(--comp-colors-Buttons-secondary-color-button-secondary-color-border_hover);
			span {
				color: var(--comp-colors-Buttons-secondary-color-button-secondary-color-fg);
			}

			+ button {
				border-left-color: var(
					--comp-colors-Buttons-secondary-color-button-secondary-color-border_hover
				);
			}
		}
	}
</style>
