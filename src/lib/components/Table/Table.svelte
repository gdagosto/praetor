<script lang="ts">
	import CardHeader from './CardHeader.svelte';
	import TableHeader from './TableHeader.svelte';
	import TableCell from './TableCell.svelte';
	import type {
		ITableHeader,
		ITableRow,
		ITableOptions,
		ITableSortHeader,
		ITableContext
	} from '$lib/types';
	import { setContext } from 'svelte';
	import { resolvePath } from '$lib/utils';
	import { createSortHeader } from './sortHeader';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';

	export let headers: ITableHeader[];
	export let rows: ITableRow[];

	export let options: ITableOptions;

	const sortHeader = createSortHeader();

	$: sortedRows = sortTable(rows, $sortHeader);

	function sortTable(rows: ITableRow[], { id, direction }: ITableSortHeader) {
		if (direction === 0) return rows;

		return [...rows].sort((a, b) => {
			const itemA = resolvePath(a, id, '');
			const itemB = resolvePath(b, id, '');

			if (typeof itemA === 'number' && typeof itemB === 'number') {
				return (itemA - itemB) * direction;
			}

			return itemA.toString().localeCompare(itemB.toString(), 'en', { numeric: true }) * direction;
		});
	}

	setContext<ITableContext>('dataTable', {
		sortHeader
	});
</script>

<div class="tableWrapper">
	<CardHeader
		title={options.title?.text}
		badge={options.title?.badge ?? ''}
		description={options.title?.description ?? ''}
		controls={options.title.controls ?? []}
		rows={sortedRows}
	/>

	<OverlayScrollbarsComponent style="width: 100%;">
		<div class="content">
			{#each headers as header}
				<div class="column">
					<TableHeader data={header} />
					{#each sortedRows as row}
						<TableCell>
							{row[header.id] ?? ''}
						</TableCell>
					{/each}
				</div>
			{/each}
			{#if options.controls}
				<div class="column">
					<TableHeader data={{ sortable: false }} />
					{#each sortedRows as row, idx}
						<TableCell>
							<div class="actions">
								{#each options.controls as control}
									<button class="action" on:click={() => control.onClick(row, idx)}>
										<svelte:component this={control.icon} size={20} />
									</button>
								{/each}
							</div>
						</TableCell>
					{/each}
				</div>
			{/if}
		</div>
	</OverlayScrollbarsComponent>
</div>

<style lang="scss">
	.tableWrapper {
		display: flex;
		width: 100%;
		padding: var(--spacing-none, 0px);
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-none, 0px);

		border-radius: var(--radius-xl, 12px);

		border: 1px solid var(--color-border-secondary, #eaecf0);
		background: var(--color-bg-primary, #fff);

		box-shadow: var(--shadow-sm);

		overflow: hidden;

		:global(.os-scrollbar) {
			margin-top: 48px;
			margin-bottom: 4px;

			--os-handle-bg: var(--color-bg-quaternary);
			--os-handle-bg-active: var(--color-fg-senary);
			--os-handle-bg-hover: var(--color-fg-senary);
			// --os-padding-axis: 30;
			// --os-size: 8px;
		}
	}

	.content {
		display: flex;
		padding: var(--spacing-none, 0px);
		align-items: flex-start;
		gap: var(--spacing-none, 0px);
		align-self: stretch;
		border-radius: var(--radius-none, 0px);
	}

	.column {
		display: flex;
		padding: var(--spacing-none, 0px);
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-none, 0px);

		&:first-child {
			flex: 1 0 0;
		}

		border-radius: var(--radius-none, 0px);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs, 4px);
		align-self: stretch;

		button {
			display: flex;
			padding: var(--spacing-md);
			justify-content: center;
			align-items: center;
			gap: var(--spacing-md, 8px);
			border-radius: var(--radius-sm, 8px);
			border: none;
			color: var(--comp-colors-Buttons-Tertiary-button-tertiary-fg);
			background-color: var(--comp-colors-Buttons-tertiary-color-button-tertiary-color-bg);
			cursor: pointer;

			&:hover {
				color: var(--comp-colors-Buttons-Tertiary-button-tertiary-fg_hover);
				background-color: var(--comp-colors-Buttons-Tertiary-button-tertiary-bg_hover);
			}
		}
	}
</style>
