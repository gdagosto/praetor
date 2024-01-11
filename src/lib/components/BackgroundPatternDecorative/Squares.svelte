<script lang="ts">
	import { PIXEL_SIZE } from './constants';
	import type { IBgPatternDecorativeSize } from '$lib/types';

	export let size: IBgPatternDecorativeSize = 'md';

	const LINE_COUNT = { sm: 6, md: 7, lg: 8 };
	const SIZE_INCREMENT = { sm: 48, md: 64, lg: 96 };
	const SIZE_DEFAULT = 96;

	$: pixelSize = PIXEL_SIZE[size];
	$: sizeIncrement = SIZE_INCREMENT[size];
</script>

<g>
	<!--eslint-disable-next-line @typescript-eslint/no-unused-vars-->
	{#each [...new Array(LINE_COUNT[size])] as _, idx}
		{@const size = SIZE_DEFAULT + sizeIncrement * idx}
		{@const start = (pixelSize - size) / 2}
		<rect x={start} y={start} rx={12} ry={12} width={size} height={size} />
	{/each}
</g>

<style>
	g {
		transform: translate(-9.64%, 12%) rotate(-12.5deg);
	}
</style>
