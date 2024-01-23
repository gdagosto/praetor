<script lang="ts">
	import Divider from './Divider.svelte';
	import HelpCircle from 'lucide-svelte/icons/help-circle';

	export let title: string = 'MISSING_LABEL';
	export let subtitle: string = '';
	export let tooltip: string = '';
</script>

<div class="settingsItem">
	<div class="label">
		<div class="headingAndHelp">
			<span class="title">{title}</span>
			{#if tooltip}
				<div class="helpIcon" title={tooltip}><HelpCircle /></div>
			{/if}
		</div>
		{#if subtitle}
			<span class="subtitle">{subtitle}</span>
		{/if}
	</div>
	<div class="content">
		<slot />
	</div>
</div>
<Divider />

<style lang="scss">
	.settingsItem {
		display: flex;
		align-items: flex-start;
		align-content: flex-start;
		gap: 16px 32px;
		align-self: stretch;
		flex-wrap: wrap;
	}

	.label {
		display: flex;
		min-width: 200px;
		max-width: 280px;
		flex-direction: column;
		align-items: flex-start;
		flex: 1 0 0;

		.headingAndHelp {
			display: flex;
			align-items: center;
			gap: var(--spacing-xxs, 2px);

			.title {
				/* Text sm/Semibold */
				font-family: var(--textsm-semibold-font-family);
				font-size: var(--textsm-semibold-font-size);
				font-style: var(--textsm-semibold-font-style);
				font-weight: var(--textsm-semibold-font-weight);
				line-height: var(--textsm-semibold-line-height);
				color: var(--color-text-secondary, #344054);
			}

			.helpIcon {
				display: flex;
				width: 16px;
				height: 16px;
				justify-content: center;
				align-items: center;
				color: var(--color-fg-quinary);
				cursor: help;

				&:hover {
					color: var(--color-fg-quinary_hover);
				}
			}
		}

		.subtitle {
			/* Text sm/Regular */
			font-family: var(--textsm-regular-font-family);
			font-size: var(--textsm-regular-font-size);
			font-style: var(--textsm-regular-font-style);
			font-weight: var(--textsm-regular-font-weight);
			line-height: var(--textsm-regular-line-height);
			color: var(--color-text-tertiary, #475467);
		}
	}

	.content {
		display: flex;
		min-width: 480px;
		max-width: 512px;
		padding: var(--spacing-none, 0px);
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-lg, 12px);
		flex: 1 0 0;
	}
</style>
