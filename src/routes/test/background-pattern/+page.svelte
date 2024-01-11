<script lang="ts">
	import { BackgroundPatternDecorative } from '$lib/components/index.js';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
</script>

<OverlayScrollbarsComponent style="width: 100%">
	<div class="wrapper">
		<div class="patternWrapper">
			<BackgroundPatternDecorative type="grid" size="sm" />
		</div>
		<div class="patternWrapper">
			<BackgroundPatternDecorative type="grid" size="md" />
		</div>
		<div class="patternWrapper">
			<BackgroundPatternDecorative type="grid" size="lg" />
		</div>
		<div class="patternWrapper">
			<BackgroundPatternDecorative type="circles" size="sm" />
		</div>
		<div class="patternWrapper">
			<BackgroundPatternDecorative type="circles" size="md" />
		</div>
		<div class="patternWrapper">
			<BackgroundPatternDecorative type="circles" size="lg" />
		</div>
		<div class="patternWrapper">
			<BackgroundPatternDecorative type="squares" size="sm" />
		</div>
		<div class="patternWrapper">
			<BackgroundPatternDecorative type="squares" size="md" />
		</div>
		<div class="patternWrapper">
			<BackgroundPatternDecorative type="squares" size="lg" />
		</div>
	</div>
</OverlayScrollbarsComponent>

<style lang="scss">
	.wrapper {
		display: flex;
		padding: 32px var(--spacing-lg) var(--spacing-6xl, 48px) var(--spacing-lg);
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 32px;
		flex: 1 0 0;
		color: var(--color-text-primary);
	}

	.patternWrapper {
		border: 1px solid red;
	}
</style>
