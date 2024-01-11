<script lang="ts">
	import type { IBgPatternDecorativeSize } from '$lib/types';
	import { PIXEL_SIZE } from './constants';

	export let size: IBgPatternDecorativeSize = 'md';

	const LINE_COUNT = { sm: 15, md: 16, lg: 17 };

	// Create svg
	function createGridPath(size: IBgPatternDecorativeSize) {
		let vPath = 'M0,0';
		let hPath = 'M0,0';
		const pixelSize = PIXEL_SIZE[size];
		const increment = pixelSize / (LINE_COUNT[size] - 1);

		[...new Array(LINE_COUNT[size])].forEach(() => {
			vPath += `v${pixelSize}m${increment},-${pixelSize}`;
			hPath += `h${pixelSize}m-${pixelSize},${increment}`;
		});

		return vPath + hPath;
	}

	$: gridPath = createGridPath(size);
</script>

<path d={gridPath} />
