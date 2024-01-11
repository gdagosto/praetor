<script lang="ts">
	import { PIXEL_SIZE } from './constants';
	import type { IBgPatternDecorativeSize } from '$lib/types';

	export let size: IBgPatternDecorativeSize = 'md';

	const LINE_COUNT = { sm: 6, md: 7, lg: 8 };
	const RADIUS_INCREASE = { sm: 24, md: 32, lg: 48 };
	const DEFAULT_RADIUS = 48;

	$: pixelSize = PIXEL_SIZE[size];
	$: radiusIncrease = RADIUS_INCREASE[size];

	$: center = pixelSize / 2;
</script>

<!--eslint-disable-next-line @typescript-eslint/no-unused-vars-->
{#each [...new Array(LINE_COUNT[size])] as _, idx}
	<circle cx={center} cy={center} r={DEFAULT_RADIUS + radiusIncrease * idx} />
{/each}
