<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';

	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let type: 'pill-color' | 'pill-outline' | 'badge-color' | 'badge-modern' = 'badge-modern';
	export let icon: ComponentType<SvelteComponent> | 'dot' | 'x' | undefined = undefined;
	export let color:
		| 'gray'
		| 'brand'
		| 'error'
		| 'warning'
		| 'success'
		| 'gray-blue'
		| 'blue-light'
		| 'blue'
		| 'indigo'
		| 'purple'
		| 'pink'
		| 'orange' = 'gray';

	export let text: string | number = 'MISSING_TEXT';
</script>

<div class={`badgeWrapper size-${size} color-${color} type-${type}`}>
	{#if icon === 'dot'}
		<div class="dot"></div>
	{:else if icon !== 'x'}
		<svelte:component this={icon} size={16} />
	{/if}
	<span class="text">{text}</span>
</div>

<style lang="scss">
	.badgeWrapper {
		display: inline-flex;
		padding: var(--spacing-xs, 4px) var(--spacing-lg, 12px);
		align-items: center;
		gap: var(--spacing-none, 0px);
		font-size: 14px;
		line-height: 20px; /* 142.857% */

		&.type-pill-color,
		&.type-pill-outline {
			&.size-sm {
				font-size: 12px;
				line-height: 18px; /* 150% */
				padding: var(--spacing-xxs, 2px) var(--spacing-md, 8px);
			}

			&.size-md {
				padding: var(--spacing-xs, 4px) var(--spacing-lg, 12px);
			}

			&.size-lg {
				padding: var(--spacing-xs, 4px) var(--spacing-lg, 12px);
			}
		}

		&.type-badge-color,
		&.type-badge-modern {
			&.size-sm {
				padding: var(--spacing-xxs, 2px) var(--spacing-md, 6px);
			}

			&.size-md {
				font-size: 14px;
				padding: var(--spacing-xxs, 2px) var(--spacing-lg, 8px);
			}

			&.size-lg {
				padding: var(--spacing-xs, 4px) 10px;
			}
		}
	}

	.dot {
		height: 8px;
		width: 8px;
		border-radius: 100%;
		color: var(--c-badge-color-dot);
	}

	.text {
		color: var(--c-badge-color-text);
		text-align: center;

		/* Text sm/Medium */
		font-family: var(--textsm-medium-font-family);
		font-size: var(--textsm-medium-font-size);
		font-style: var(--textsm-medium-font-style);
		font-weight: var(--textsm-medium-font-weight);
		line-height: var(--textsm-medium-line-height);
	}

	.type-pill-color {
		border-radius: var(--radius-full, 9999px);

		&.color-gray {
			border: 1px solid var(--util-colors-Gray-utility-gray-200);
			background: var(--util-colors-Gray-utility-gray-50);
			--c-badge-color-text: var(--util-colors-Gray-utility-gray-700);
		}
	}
</style>
