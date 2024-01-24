<script lang="ts">
	import type { INavItem } from '$lib/types';
	import Badge from '../Badge/Badge.svelte';

	export let current: boolean = false;
	export let dot: INavItem['dot'] = false;
	export let icon: INavItem['icon'] = undefined;
	export let badge: INavItem['badge'] = undefined;
	export let text: INavItem['text'] = 'MISSING_TEXT';
	export let disabled: INavItem['disabled'] = false;
</script>

<button class="navItemWrapper" class:current on:click {disabled}>
	<div class="content">
		{#if dot}
			<div class="dot" />
		{/if}

		{#if icon}
			<svelte:component this={icon} size={24} color="var(--c-nav-item-icon-color)" />
		{/if}

		<span class="text">
			{text}
		</span>
	</div>

	{#if badge}
		<Badge text={badge} type="pill-color" color="gray" size="sm" />
	{/if}
</button>

<style lang="scss">
	/** Variables */
	.navItemWrapper {
		--c-nav-item-text-color: var(--color-text-secondary);
		--c-nav-item-bg-color: var(--color-bg-primary);
		--c-nav-item-icon-color: var(--comp-colors-app-navigation-nav-item-icon-fg);
		user-select: none;

		&:hover {
			--c-nav-item-bg-color: var(--color-bg-primary_hover);
			--c-nav-item-text-color: var(--color-text-secondary_hover);
		}

		&:focus-within {
			/* Focus rings/ring-gray */
			box-shadow: 0px 0px 0px 4px rgba(152, 162, 179, 0.14);
		}

		&.current {
			--c-nav-item-bg-color: var(--color-bg-active);
			--c-nav-item-text-color: var(--color-text-secondary_hover);
			--c-nav-item-icon-color: var(--comp-colors-app-navigation-nav-item-icon-fg_active);

			&:hover {
				--c-nav-item-bg-color: var(--color-bg-secondary_hover);
				--c-nav-item-text-color: var(--color-text-secondary_hover);
			}
		}

		&:disabled {
			--c-nav-item-text-color: var(--color-text-disabled);
			--c-nav-item-icon-color: var(--color-fg-disabled);
			pointer-events: none;
		}
	}

	.navItemWrapper {
		display: flex;
		padding: var(--spacing-md, 8px) var(--spacing-lg, 12px);
		align-items: center;
		gap: var(--spacing-md, 8px);
		width: 100%;
		border: none;
		outline: none;

		border-radius: var(--radius-sm, 6px);
		background: var(--c-nav-item-bg-color, #fff);

		cursor: pointer;
	}

	.content {
		display: flex;
		padding: var(--spacing-none, 0px);
		align-items: center;
		gap: var(--spacing-lg, 12px);
		flex: 1 0 0;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background-color: var(--color-fg-success-secondary);
	}

	.text {
		color: var(--c-nav-item-text-color, #344054);

		/* Text md/Semibold */
		font-family: var(--textmd-semibold-font-family);
		font-size: var(--textmd-semibold-font-size);
		font-style: var(--textmd-semibold-font-style);
		font-weight: var(--textmd-semibold-font-weight);
		line-height: var(--textmd-semibold-line-height);
	}
</style>
