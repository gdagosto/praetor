<script lang="ts">
	import { Divider } from '../Divider/index.js';

	export let title: string = 'MISSING_TITLE';
	export let subtitle: string = '';
</script>

<section class="headerSection">
	<div class="pageHeader">
		<div class="content">
			<div class="allText">
				<h2>{title}</h2>
				{#if subtitle}
					<h4>{subtitle}</h4>
				{/if}
			</div>
		</div>
		<Divider />
	</div>
</section>

<style lang="scss">
	.headerSection {
		display: flex;

		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-3xl, 24px);
		align-self: stretch;
	}

	.pageHeader {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-2xl, 20px);
		align-self: stretch;

		.content {
			display: flex;

			align-items: flex-start;
			align-content: flex-start;
			gap: var(--spacing-2xl, 20px) var(--spacing-xl, 16px);
			align-self: stretch;
			flex-wrap: wrap;

			.allText {
				display: flex;
				min-width: var(--width-xxs, 320px);

				flex-direction: column;
				align-items: flex-start;
				gap: var(--spacing-xs, 4px);
				flex: 1 0 0;

				h2 {
					/* Display sm/Semibold */
					font-family: var(--displaysm-semibold-font-family);
					font-size: var(--displaysm-semibold-font-size);
					font-style: var(--displaysm-semibold-font-style);
					font-weight: var(--displaysm-semibold-font-weight);
					line-height: var(--displaysm-semibold-line-height);
					color: var(--color-text-primary, #101828);
				}

				h4 {
					/* Text md/Regular */
					font-family: var(--textmd-regular-font-family);
					font-size: var(--textmd-regular-font-size);
					font-style: var(--textmd-regular-font-style);
					font-weight: var(--textmd-regular-font-weight);
					line-height: var(--textmd-regular-line-height);
					color: var(--color-text-tertiary, #475467);
				}
			}
		}
	}
</style>
