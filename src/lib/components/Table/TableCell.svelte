<script lang="ts">
</script>

<div class="tableCell">
	<slot />
</div>

<style lang="scss">
	.tableCell {
		display: flex;
		height: 72px;
		padding: var(--spacing-xl, 16px) var(--spacing-3xl, 24px);
		align-items: center;
		align-self: stretch;
		gap: var(--spacing-lg, 12px);
		border-bottom: 1px solid var(--color-border-secondary, #1f242f);

		&:last-child {
			border-bottom: 0px solid transparent;
		}

		color: var(--color-text-primary, #94969c);

		/* Text sm/Regular */
		font-family: var(--textsm-regular-font-family);
		font-size: var(--textsm-regular-font-size);
		font-style: var(--textsm-regular-font-style);
		font-weight: var(--textsm-regular-font-weight);
		line-height: var(--textsm-regular-line-height);
	}
</style>
