<script lang="ts">
	import Circles from './Circles.svelte';
	import Grid from './Grid.svelte';
	import { PIXEL_SIZE } from './constants';
	import type { IBgPatternDecorativeSize } from '$lib/types';
	import Squares from './Squares.svelte';

	export let size: IBgPatternDecorativeSize = 'md';
	export let type: 'empty' | 'grid' | 'grid-dot' | 'circles' | 'squares' = 'empty';
	export let style: string = '';

	$: pixelSize = PIXEL_SIZE[size];
	$: gradientMaskId = `mask-radial-center-${size}`;
</script>

<div class={`bgPatternDecorative type-${type} size-${size}`} {style}>
	<svg
		viewBox="0 0 {pixelSize} {pixelSize}"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<defs>
			<radialGradient id="rg">
				<stop offset="0" stop-color="white" />
				<stop offset="1" stop-color="black" />
			</radialGradient>

			<mask id={gradientMaskId}>
				<rect x="-1" y="-1" width={pixelSize + 2} height={pixelSize + 2} fill="url(#rg)" />
			</mask>
		</defs>

		<g mask="url(#{gradientMaskId})">
			{#if type === 'grid'}
				<Grid {size} />
			{:else if type === 'circles'}
				<Circles {size} />
			{:else if type === 'squares'}
				<Squares {size} />
			{/if}
		</g>
	</svg>
</div>

<style lang="scss">
	.bgPatternDecorative {
		flex-shrink: 0;
		width: var(--width-sm, 480px);
		height: var(--width-sm, 480px);
	}

	.size-sm {
		width: 336px;
		height: 336px;
	}

	.size-md {
		width: var(--width-sm, 480px);
		height: var(--width-sm, 480px);
	}

	.size-lg {
		width: var(--width-xl, 768px);
		height: var(--width-xl, 768px);
	}

	svg {
		stroke: var(--color-border-secondary);
		stroke-width: 1;
		fill: transparent;
	}
</style>
