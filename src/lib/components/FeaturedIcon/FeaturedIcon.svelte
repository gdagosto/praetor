<script lang="ts">
	import type { SvelteComponent, ComponentType } from 'svelte';

	export let icon: ComponentType<SvelteComponent>;
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

	type IFeaturedIconType = 'modern' | 'dark' | 'light';
	export let type: IFeaturedIconType = 'modern';

	type IFeaturedIconColor = 'brand' | 'gray' | 'error' | 'warning' | 'success';
	export let color: IFeaturedIconColor = 'brand';

	$: iconSize = getIconSize(size);

	function getIconSize(size: string) {
		if (size === 'sm') return 16;
		if (size === 'md') return 20;
		if (size === 'lg') return 24;
		if (size === 'xl') return 28;
		return 4;
	}
</script>

<div class={`featuredIconWrapper size-${size} type-${type} color-${color}`}>
	<svelte:component this={icon} size={iconSize} {...$$restProps} />
</div>

<style lang="scss">
	.featuredIconWrapper {
		display: flex;
		width: 40px;
		height: 40px;
		padding: var(--spacing-none, 10px);
		justify-content: center;
		align-items: center;
		gap: var(--spacing-none, 0px);
		flex-shrink: 0;
		box-shadow: var(--shadow-xs);

		&.size-sm {
			width: 32px;
			height: 32px;
			padding: var(--spacing-none, 8px);
			border-radius: var(--radius-sm, 6px);
		}

		&.size-md {
			width: 40px;
			height: 40px;
			padding: var(--spacing-none, 10px);
			border-radius: var(--radius-md, 8px);
		}

		&.size-lg {
			width: 48px;
			height: 48px;
			padding: var(--spacing-none, 12px);
			border-radius: var(--radius-lg, 10px);
		}

		&.size-xl {
			border-radius: var(--spacing-lg, 12px);
			width: 56px;
			height: 56px;
			padding: var(--spacing-none, 14px);
		}

		&.type-modern {
			color: var(--color-fg-secondary);
			border: 1px solid var(--comp-colors-Icons-featured-icons-Modern-featured-icon-modern-border);
		}

		&.type-dark {
			&.color-brand {
				color: var(--comp-colors-Icons-featured-icons-Dark-featured-icon-dark-fg-brand);
				background: var(--color-bg-brand-solid);
			}
			&.color-gray {
				color: var(--comp-colors-Icons-featured-icons-Dark-featured-icon-dark-fg-gray);
				background: var(--color-bg-gray-solid);
			}
			&.color-error {
				color: var(--comp-colors-Icons-featured-icons-Dark-featured-icon-dark-fg-error);
				background: var(--color-bg-error-solid);
			}
			&.color-warning {
				color: var(--comp-colors-Icons-featured-icons-Dark-featured-icon-dark-fg-warning);
				background: var(--color-bg-warning-solid);
			}
			&.color-success {
				color: var(--comp-colors-Icons-featured-icons-Dark-featured-icon-dark-fg-success);
				background: var(--color-bg-success-solid);
			}
		}

		&.type-light {
			border-radius: var(--radius-full, 9999px);
			&.color-brand {
				color: var(--comp-colors-Icons-featured-icons-Dark-featured-icon-light-fg-brand);
				background: var(--color-bg-brand-secondary);
			}
			&.color-gray {
				color: var(--comp-colors-Icons-featured-icons-Dark-featured-icon-light-fg-gray);
				background: var(--color-bg-tertiary);
			}
			&.color-error {
				color: var(--comp-colors-Icons-featured-icons-Dark-featured-icon-light-fg-error);
				background: var(--color-bg-error-secondary);
			}
			&.color-warning {
				color: var(--comp-colors-Icons-featured-icons-Dark-featured-icon-light-fg-warning);
				background: var(--color-bg-warning-secondary);
			}
			&.color-success {
				color: var(--comp-colors-Icons-featured-icons-Dark-featured-icon-light-fg-success);
				background: var(--color-bg-success-secondary);
			}
		}
	}
</style>
