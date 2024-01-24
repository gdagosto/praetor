<script lang="ts">
	import type { ITableHeaderControl, ITableRow } from '$lib/types';
	import Button from '../Button/Button.svelte';
	// import ThreeDots from '../ThreeDots/ThreeDots.svelte';

	export let title = 'MISSING_MAIN_TEXT';
	export let description = '';
	export let badge = '';
	export let controls: ITableHeaderControl[] = [];
	export let rows: ITableRow[];
</script>

<div class="cardHeader">
	<div class="content">
		<div class="allText">
			<div class="textAndBadge">
				<div class="title">{title}</div>

				{#if badge}
					<div class="badge">{badge}</div>
				{/if}
			</div>
			{#if description}
				<div class="description">{description}</div>
			{/if}
		</div>

		<div class="actions">
			{#each controls as control}
				<Button
					hierarchy={control.hierarchy}
					iconLeft={control.icon}
					text={control.text}
					on:click={() => control.onClick(rows)}
				/>
			{/each}
		</div>
		<!-- <div class="dropdown">
			<ThreeDots />
		</div> -->
	</div>
	<div class="divider"></div>
</div>

<style lang="scss">
	.cardHeader {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-2xl, 20px);
		align-self: stretch;

		background: var(--color-bg-primary, #0c111d);
	}

	.content {
		display: flex;
		padding: var(--spacing-2xl, 20px) var(--spacing-3xl, 24px) var(--spacing-none, 0px)
			var(--spacing-3xl, 24px);
		align-items: flex-start;
		gap: var(--spacing-xl, 16px);
		align-self: stretch;

		border-radius: var(--radius-none, 0px);

		.allText {
			display: flex;
			height: 52px;
			padding: var(--spacing-none, 0px);
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			gap: var(--spacing-xs, 4px);
			flex: 1 0 0;

			.textAndBadge {
				display: flex;
				padding: var(--spacing-none, 0px);
				align-items: center;
				gap: var(--spacing-md, 8px);
				align-self: stretch;
				border-radius: var(--radius-none, 0px);

				.title {
					color: var(--color-text-primary, #f5f5f6);

					/* Text lg/Semibold */
					font-family: var(--textlg-semibold-font-family);
					font-size: var(--textlg-semibold-font-size);
					font-style: var(--textlg-semibold-font-style);
					font-weight: var(--textlg-semibold-font-weight);
					line-height: var(--textlg-semibold-line-height);
				}

				.badge {
					display: flex;
					padding: var(--spacing-xxs, 2px) var(--spacing-sm, 6px);
					align-items: center;
					border-radius: var(--radius-sm, 6px);
					border: 1px solid var(--color-border-primary, #333741);
					background: var(--color-bg-primary, #0c111d);

					color: var(--color-text-secondary, #cecfd2);
					text-align: center;

					/* Text xs/Medium */
					font-family: var(--textxs-medium-font-family);
					font-size: var(--textxs-medium-font-size);
					font-style: var(--textxs-medium-font-style);
					font-weight: var(--textxs-medium-font-weight);
					line-height: var(--textxs-medium-line-height);
				}
			}

			.description {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				align-self: stretch;

				overflow: hidden;
				color: var(--color-text-tertiary, #94969c);
				text-overflow: ellipsis;

				/* Text sm/Regular */
				font-family: var(--textsm-regular-font-family);
				font-size: var(--textsm-regular-font-size);
				font-style: var(--textsm-regular-font-style);
				font-weight: var(--textsm-regular-font-weight);
				line-height: var(--textsm-regular-line-height);
			}
		}

		.actions {
			display: flex;
			padding: var(--spacing-none, 0px);
			align-items: center;
			gap: var(--spacing-lg, 12px);
			border-radius: var(--radius-none, 0px);
		}
	}

	// .dropdown {
	// 	display: flex;
	// 	padding: var(--spacing-sm);
	// 	flex-direction: column;
	// 	align-items: flex-start;
	// 	border-radius: var(--radius-sm);
	// 	cursor: pointer;
	// 	color: var(--color-text-tertiary);

	// 	&:hover {
	// 		background-color: var(--color-bg-secondary);
	// 		color: var(--color-text-secondary);
	// 	}
	// }

	.divider {
		height: 1px;
		align-self: stretch;
		border-bottom: 1px solid var(--color-border-secondary, #eaecf0);
		width: 100%;
	}
</style>
