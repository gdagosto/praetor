<script lang="ts">
	import type { ITabItem, ITabSize, ITabType } from '$lib/types';
	import { writable, type Writable } from 'svelte/store';

	export let items: ITabItem[] = [];
	export let type: ITabType = 'button-white-border';
	export let size: ITabSize = 'sm';
	export let fullWidth: boolean = false;
	export let stCurrentId: Writable<ITabItem['id']> = writable(items[0].id);

	function onClickItem(id: ITabItem['id'], onClick: ITabItem['onClick']) {
		stCurrentId.set(id);

		onClick();
	}
</script>

<div class={`tabsWrapper size-${size} type-${type}`} class:fullWidth>
	{#if type === 'underline' || type === 'underline-filled'}
		<div class="tabs">
			{#each items as item}
				<button
					class="tabItem"
					class:current={item.id === $stCurrentId}
					on:click={() => onClickItem(item.id, item.onClick)}>{item.text}</button
				>
			{/each}
		</div>
	{:else}
		{#each items as item}
			<button
				class="tabItem"
				class:current={item.id === $stCurrentId}
				on:click={() => onClickItem(item.id, item.onClick)}>{item.text}</button
			>
		{/each}
	{/if}
</div>

<style lang="scss">
	.tabsWrapper {
		display: flex;
		padding: var(--spacing-none, 0px);
		align-items: center;
		gap: var(--spacing-xs, 4px);
		justify-content: center;

		&.type-underline,
		&.type-underline-filled {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md, 8px);
			border-bottom: 1px solid var(--color-border-secondary, #eaecf0);
			justify-content: flex-start;
		}

		&.type-button-white-border {
			padding: var(--spacing-xs, 4px);
			border-radius: var(--radius-lg, 10px);
			border: 1px solid var(--color-border-secondary, #eaecf0);
			background: var(--color-bg-secondary_alt, #f9fafb);
		}

		&.fullWidth {
			width: 100%;

			.tabs {
				width: 100%;
			}
		}
	}

	.tabs {
		display: flex;
		padding: var(--spacing-none, 0px);
		align-items: flex-start;
		gap: var(--spacing-lg, 12px);
	}

	button {
		--c-tabs-btn-default-color: var(--colors-text-text-quaternary-500, #667085);
		--c-tabs-btn-default-bg: transparent;
		--c-tabs-btn-default-border-color: transparent;
		--c-tabs-btn-default-shadow: 0;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		user-select: none;

		border: none;
		background: transparent;

		color: var(--c-tabs-btn-color, var(--c-tabs-btn-default-color));
		background-color: var(--c-tabs-btn-bg, var(--c-tabs-btn-default-bg));
		&:hover {
			color: var(--c-tabs-btn-color_hover, var(--c-tabs-btn-default-color));
			background-color: var(--c-tabs-btn-bg_hover, var(--c-tabs-btn-default-bg));
			box-shadow: var(--c-tabs-btn-shadow_hover, var(--c-tabs-btn-default-shadow));
		}
		&.current {
			color: var(--c-tabs-btn-color_current, var(--c-tabs-btn-default-color));
			background-color: var(--c-tabs-btn-bg_current, var(--c-tabs-btn-default-bg));
			box-shadow: var(--c-tabs-btn-shadow_current);
		}
		&:focus-within {
			box-shadow: var(--c-tabs-btn-shadow_focus, 0);
		}

		font-family: Inter;
		font-style: normal;
		font-weight: 600;
		cursor: pointer;
		outline: none;
	}

	.size-sm button {
		/* Text sm/Semibold */
		font-size: 14px;
		line-height: 20px; /* 142.857% */
	}

	.size-md button {
		/* Text sm/Semibold */
		font-size: 16px;
		line-height: 24px; /* 142.857% */
	}

	.fullWidth button {
		display: flex;
		flex: 1 0 0;
	}

	.type-button-primary,
	.type-button-gray,
	.type-button-white-border {
		button {
			height: 36px;
			padding: var(--spacing-md, 8px) var(--spacing-lg, 12px);
			border-radius: var(--radius-sm, 6px);
		}

		&.size-sm button {
			height: 36px;
		}

		&.size-md button {
			height: 44px;
		}
	}

	.type-underline,
	.type-underline-filled {
		button {
			border-bottom: 2px solid var(--c-tabs-btn-default-border-color);
			border-color: var(--c-tabs-btn-border-color, var(--c-tabs-btn-default-border-color));
			&:hover {
				border-color: var(--c-tabs-btn-border-color_hover, var(--c-tabs-btn-default-border-color));
			}
			&.current {
				border-color: var(
					--c-tabs-btn-border-color_current,
					var(--c-tabs-btn-default-border-color)
				);
			}
		}
	}

	.type-underline button {
		padding: 0px var(--spacing-xs, 4px) var(--spacing-lg, 12px) var(--spacing-xs, 4px);
	}

	.type-underline-filled button {
		padding: var(--spacing-lg, 12px);
	}

	.type-button-primary {
		--c-tabs-btn-color_hover: var(--color-text-brand-secondary);
		--c-tabs-btn-bg_hover: var(--color-bg-brand-primary_alt, #f9f5ff);
		--c-tabs-btn-color_current: var(--color-text-brand-secondary);
		--c-tabs-btn-bg_current: var(--color-bg-brand-primary_alt, #f9f5ff);
		/* Focus rings/ring-brand */
		--c-tabs-btn-shadow_focus: 0px 0px 0px 4px rgba(158, 119, 237, 0.24);
	}

	.type-button-gray {
		--c-tabs-btn-color_hover: var(--color-text-secondary);
		--c-tabs-btn-bg_hover: var(--color-bg-primary_hover);
		--c-tabs-btn-color_current: var(--color-text-secondary);
		--c-tabs-btn-bg_current: var(--color-bg-active);
		/* Focus rings/ring-gray */
		--c-tabs-btn-shadow_focus: 0px 0px 0px 4px rgba(152, 162, 179, 0.14);
	}

	.type-button-white-border {
		--c-tabs-btn-color_hover: var(--color-text-secondary);
		--c-tabs-btn-bg_hover: var(--color-bg-primary_alt);
		--c-tabs-btn-shadow_hover: var(--shadow-sm);
		--c-tabs-btn-color_current: var(--color-text-secondary);
		--c-tabs-btn-bg_current: var(--color-bg-primary_alt);
		--c-tabs-btn-shadow_current: var(--shadow-sm);
		/* Focus rings/ring-gray-shadow-sm */
		--c-tabs-btn-shadow_focus: 0px 0px 0px 4px rgba(152, 162, 179, 0.14),
			0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1);
	}

	.type-underline {
		--c-tabs-btn-color_hover: var(--color-text-brand-secondary);
		--c-tabs-btn-border-color_hover: var(--color-fg-brand-primary_alt);
		--c-tabs-btn-color_current: var(--color-text-brand-secondary);
		--c-tabs-btn-border-color_current: var(--color-fg-brand-primary_alt);
	}

	.type-underline-filled {
		--c-tabs-btn-color_hover: var(--color-text-brand-secondary);
		--c-tabs-btn-border-color_hover: var(--color-fg-brand-primary_alt);
		--c-tabs-btn-bg_hover: var(--color-bg-brand-primary_alt);
		--c-tabs-btn-color_current: var(--color-text-brand-secondary);
		--c-tabs-btn-border-color_current: var(--color-fg-brand-primary_alt);
		--c-tabs-btn-bg_current: var(--color-bg-brand-primary_alt);
	}
</style>
