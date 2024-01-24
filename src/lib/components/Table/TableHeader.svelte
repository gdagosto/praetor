<script lang="ts">
	import type { ITableContext, ITableHeader } from '$lib/types';
	import { getContext } from 'svelte';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';

	export let data: Partial<ITableHeader> = {};

	const defaultData: ITableHeader = {
		id: '',
		text: '',
		sortable: true
	};

	$: actualData = { ...defaultData, ...data };

	const { sortHeader } = getContext<ITableContext>('dataTable');

	function onClick() {
		if (!actualData.sortable) return;
		sortHeader.change(actualData.id);
	}
</script>

<button class="thCell" class:sortable={actualData.sortable} on:click={onClick}>
	<div class="th">{actualData.text}</div>
	{#if actualData.sortable}
		<div
			class="sortIcon"
			class:show={$sortHeader.id === actualData.id && $sortHeader.direction !== 0}
			class:down={$sortHeader.direction === -1}
		>
			<ArrowDown size={16} />
		</div>
	{/if}
</button>

<style lang="scss">
	.thCell {
		display: flex;
		height: 44px;
		padding: var(--spacing-lg, 12px) var(--spacing-3xl, 24px);
		align-items: center;
		gap: var(--spacing-lg, 12px);
		align-self: stretch;

		border: none;

		border-bottom: 1px solid var(--color-border-secondary, #1f242f);
		background: var(--color-bg-secondary, #161b26);

		position: sticky;
		top: 0;

		&.sortable {
			cursor: pointer;
		}

		&:hover {
			.th {
				color: var(--color-text-tertiary_hover);
			}

			.sortIcon {
				color: var(--color-fg-tertiary_hover);
			}
		}
	}

	.th {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs, 4px);
		pointer-events: none;

		color: var(--color-text-tertiary, #94969c);

		/* Text xs/Medium */
		font-family: var(--textxs-medium-font-family);
		font-size: var(--textxs-medium-font-size);
		font-style: var(--textxs-medium-font-style);
		font-weight: var(--textxs-medium-font-weight);
		line-height: var(--textxs-medium-line-height);
	}

	.sortIcon {
		width: 16px;
		height: 16px;
		color: var(--color-fg-tertiary);
		opacity: 0;

		transition: var(--transition-1);

		&.show {
			opacity: 1;
		}

		&.down {
			rotate: 180deg;
		}
	}
</style>
