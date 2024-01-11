<script lang="ts">
	import X from 'lucide-svelte/icons/x';

	export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<button class={`size-${size}`} on:click>
	<X size={size === 'lg' ? 24 : 20} />
</button>

<style lang="scss">
	button {
		display: flex;
		width: 40px;
		height: 40px;
		padding: var(--spacing-md, 8px);
		justify-content: center;
		align-items: center;
		gap: var(--spacing-none, 0px);
		flex-shrink: 0;
		border-radius: var(--radius-md, 8px);
		color: var(--color-fg-quinary);

		border: none;
		background: transparent;
		cursor: pointer;

		&.size-sm {
			width: 36px;
			height: 36px;
		}

		&.size-md {
			width: 40px;
			height: 40px;
		}

		&.size-lg {
			width: 44px;
			height: 44px;
		}

		&:hover {
			color: var(--color-fg-quinary_hover);
			background: var(--color-bg-primary_hover, #f9fafb);
		}
	}
</style>
