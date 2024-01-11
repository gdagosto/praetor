<script lang="ts">
	import type { IButtonHierarchy, IButtonSize } from '$lib/types';
	import type { SvelteComponent, ComponentType } from 'svelte';

	export let hierarchy: IButtonHierarchy = 'primary';

	export let size: IButtonSize = 'md';

	export let text: string = '';
	export let iconLeft: ComponentType<SvelteComponent> | undefined = undefined;
	export let iconRight: ComponentType<SvelteComponent> | undefined = undefined;
	export let iconDot: boolean = false;
	export let iconOnly: boolean = false;
	export let disabled: boolean = false;

	$: icon = (iconOnly && iconLeft) || iconRight;
	$: iconSize = size === '2xl' ? 24 : 20;
</script>

<button
	{disabled}
	class={`hierarchy-${hierarchy} size-${size}`}
	class:iconDot
	class:iconOnly
	on:click
>
	{#if iconOnly}
		<svelte:component this={icon} size={iconSize} />
	{:else}
		{#if iconLeft}
			<svelte:component this={iconLeft} size={iconSize} />
		{/if}
		{#if text}
			<div class="textPadding">{text}</div>
		{/if}
		{#if iconRight}
			<svelte:component this={iconRight} size={iconSize} />
		{/if}
	{/if}
</button>

<style lang="scss">
	.textPadding {
		display: flex;
		padding: var(--spacing-none, 0px) var(--spacing-xxs, 2px);
		justify-content: center;
		align-items: center;
		gap: var(--spacing-none, 0px);
		border-radius: var(--radius-none, 0px);
		text-wrap: nowrap;
	}

	button {
		display: inline-flex;
		padding: var(--spacing-md, 8px) var(--spacing-lg, 12px);
		justify-content: center;
		align-items: center;
		gap: var(--spacing-xs, 4px);
		border-radius: var(--radius-md, 8px);
		cursor: pointer;
		flex: 1 0 0;
		user-select: none;

		color: var(--c-btn-color);
		background: var(--c-btn-background);
		border: var(--c-btn-border);
		box-shadow: var(--c-btn-shadow);

		&:disabled {
			pointer-events: none;
			color: var(--c-btn-color_disabled);
			background: var(--c-btn-background_disabled);
			border: var(--c-btn-border_disabled);
		}

		&:hover {
			color: var(--c-btn-color_hover, var(--c-btn-color));
			border: var(--c-btn-border_hover, var(--c-btn-border));
			background: var(--c-btn-background_hover, var(--c-btn-background));
		}

		&:focus-within {
			outline: none;

			border: var(--c-btn-border_focus, var(--c-btn-border));
			box-shadow: var(--c-btn-shadow_focus, var(--c-btn-shadow));
		}

		&.hierarchy-primary {
			--c-btn-shadow: var(--shadow-xs);
			--c-btn-color: var(--comp-colors-Buttons-Primary-button-primary-fg);
			--c-btn-border: 1px solid var(--comp-colors-Buttons-Primary-button-primary-border);
			--c-btn-background: var(--comp-colors-Buttons-Primary-button-primary-bg);

			--c-btn-color_hover: var(--c-btn-color);
			--c-btn-border_hover: 1px solid var(--comp-colors-Buttons-Primary-button-primary-border_hover);
			--c-btn-background_hover: var(--comp-colors-Buttons-Primary-button-primary-bg_hover);

			--c-btn-border_focus: 1px solid
				var(--comp-colors-Buttons-Primary-button-primary-border, #7f56d9);

			/* Focus rings/ring-brand-shadow-xs */
			--c-btn-shadow_focus: 0px 0px 0px 4px rgba(158, 119, 237, 0.24),
				0px 1px 2px 0px rgba(16, 24, 40, 0.05);

			--c-btn-color_disabled: var(--color-fg-disabled);
			--c-btn-background_disabled: var(--color-bg-disabled);
			--c-btn-border_disabled: 1px solid var(--color-border-disabled);
		}

		&.hierarchy-secondary-gray {
			--c-btn-shadow: var(--shadow-xs);
			--c-btn-color: var(--comp-colors-Buttons-Secondary-button-secondary-fg);
			--c-btn-border: 1px solid var(--comp-colors-Buttons-Secondary-button-secondary-border);
			--c-btn-background: var(--comp-colors-Buttons-Secondary-button-secondary-bg);

			--c-btn-border_hover: 1px solid
				var(--comp-colors-Buttons-Secondary-button-secondary-border_hover);
			--c-btn-background_hover: var(--comp-colors-Buttons-Secondary-button-secondary-bg_hover);

			--c-btn-border_focus: 1px solid
				var(--comp-colors-Buttons-Secondary-button-secondary-border, #d0d5dd);

			/* Focus rings/ring-gray-shadow-xs */
			--c-btn-shadow_focus: 0px 0px 0px 4px rgba(152, 162, 179, 0.14),
				0px 1px 2px 0px rgba(16, 24, 40, 0.05);

			--c-btn-color_disabled: var(--color-fg-disabled);
			--c-btn-background_disabled: var(--color-bg-primary);
			--c-btn-border_disabled: 1px solid var(--color-border-disabled);
		}

		&.hierarchy-secondary-color {
			--c-btn-shadow: var(--shadow-xs);
			--c-btn-color: var(--comp-colors-Buttons-secondary-color-button-secondary-color-fg);
			--c-btn-border: 1px solid
				var(--comp-colors-Buttons-secondary-color-button-secondary-color-border);
			--c-btn-background: var(--comp-colors-Buttons-secondary-color-button-secondary-color-bg);

			--c-btn-border_hover: 1px solid
				var(--comp-colors-Buttons-secondary-color-button-secondary-color-border_hover);

			--c-btn-background_hover: var(
				--comp-colors-Buttons-secondary-color-button-secondary-color-bg_hover
			);

			--c-btn-border_focus: 1px solid
				var(--comp-colors-Buttons-secondary-color-button-secondary-color-border, #d6bbfb);

			/* Focus rings/ring-brand-shadow-xs */
			--c-btn-shadow_focus: 0px 0px 0px 4px rgba(158, 119, 237, 0.24),
				0px 1px 2px 0px rgba(16, 24, 40, 0.05);

			--c-btn-color_disabled: var(--color-fg-disabled);
			--c-btn-background_disabled: var(--color-bg-primary);
			--c-btn-border_disabled: 1px solid var(--color-border-disabled);
		}

		&.hierarchy-tertiary-gray {
			--c-btn-color: var(--comp-colors-Buttons-Tertiary-button-tertiary-fg);
			--c-btn-color_hover: var(--comp-colors-Buttons-Tertiary-button-tertiary-fg_hover);

			--c-btn-color_disabled: var(--color-fg-disabled);
		}

		&.hierarchy-tertiary-color {
			--c-btn-color: var(--comp-colors-Buttons-tertiary-color-button-tertiary-color-fg);
			--c-btn-color_hover: var(--comp-colors-Buttons-tertiary-color-button-tertiary-color-fg_hover);
			--c-btn-color_disabled: var(--color-fg-disabled);
		}

		&.hierarchy-link-gray {
			--c-btn-color: var(--comp-colors-Buttons-Tertiary-button-tertiary-fg);
			--c-btn-color_hover: var(--comp-colors-Buttons-Tertiary-button-tertiary-fg_hover);
			--c-btn-color_disabled: var(--color-fg-disabled);
		}

		&.hierarchy-link-color {
			--c-btn-color: var(--comp-colors-Buttons-tertiary-color-button-tertiary-color-fg);
			--c-btn-color_hover: var(--comp-colors-Buttons-tertiary-color-button-tertiary-color-fg_hover);
			--c-btn-color_disabled: var(--color-fg-disabled);
		}

		&.hierarchy-primary-destructive {
			--c-btn-shadow: var(--shadow-xs);
			--c-btn-color: var(--comp-colors-Buttons-Primary-button-primary-fg);
			--c-btn-border: 1px solid
				var(--comp-colors-Buttons-Primary-error-button-primary-error-border, #d92d20);
			--c-btn-background: var(--comp-colors-Buttons-Primary-error-button-primary-error-bg, #d92d20);

			--c-btn-color_hover: var(--c-btn-color);
			--c-btn-border_hover: 1px solid
				var(--comp-colors-Buttons-Primary-error-button-primary-error-border_hover, #b42318);
			--c-btn-background_hover: var(
				--comp-colors-Buttons-Primary-error-button-primary-error-bg_hover,
				#b42318
			);

			--c-btn-border_focus: var(--c-btn-border);

			/* Focus rings/ring-brand-shadow-xs */
			--c-btn-shadow_focus: 0px 0px 0px 4px rgba(240, 68, 56, 0.24),
				0px 1px 2px 0px rgba(16, 24, 40, 0.05);
		}

		&.hierarchy-secondary-destructive {
			--c-btn-shadow: var(--shadow-xs);
			--c-btn-color: var(--comp-colors-Buttons-secondary-error-button-secondary-error-fg);
			--c-btn-border: 1px solid
				var(--comp-colors-Buttons-secondary-error-button-secondary-error-border, #d92d20);
			--c-btn-background: var(
				--comp-colors-Buttons-secondary-error-button-secondary-error-bg,
				#d92d20
			);

			--c-btn-color_hover: var(--c-btn-color);
			--c-btn-border_hover: 1px solid
				var(--comp-colors-Buttons-Secondary-error-button-secondary-error-border_hover, #b42318);
			--c-btn-background_hover: var(
				--comp-colors-Buttons-secondary-error-button-secondary-error-bg_hover,
				#b42318
			);

			--c-btn-border_focus: var(--c-btn-border);

			/* Focus rings/ring-brand-shadow-xs */
			--c-btn-shadow_focus: 0px 0px 0px 4px rgba(240, 68, 56, 0.24),
				0px 1px 2px 0px rgba(16, 24, 40, 0.05);
		}

		&.hierarchy-tertiary-destructive {
			--c-btn-color: var(--comp-colors-Buttons-tertiary-error-button-tertiary-error-fg);
			--c-btn-color_hover: var(--comp-colors-Buttons-tertiary-error-button-tertiary-error-fg_hover);
			--c-btn-background_hover: var(
				--comp-colors-Buttons-tertiary-error-button-tertiary-error-bg_hover
			);
		}

		&.size-sm {
			padding: var(--spacing-md) var(--spacing-lg);
			gap: var(--spacing-xs);
			&.iconOnly {
				padding: var(--spacing-md);
			}
		}

		&.size-md {
			padding: 10px 14px;
			gap: var(--spacing-xs);

			&.iconOnly {
				padding: 10px;
			}
		}

		&.size-lg {
			padding: 10px var(--spacing-xl);
			gap: var(--spacing-sm);

			&.iconOnly {
				padding: var(--spacing-lg);
			}
		}

		&.size-xl {
			padding: var(--spacing-lg) 18px;
			gap: var(--spacing-sm);

			&.iconOnly {
				padding: 14px;
			}
		}

		&.size-2xl {
			padding: var(--spacing-xl) 22px;
			gap: 10px;

			&.iconOnly {
				padding: var(--spacing-xl);
			}
		}
	}
</style>
