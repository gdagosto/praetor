<script lang="ts">
	type IBgMaskType = 'radial-center' | 'radial-down' | 'radial-up' | 'linear-down' | 'linear-up';
	export let size: number = 640;
	export let type: IBgMaskType = 'radial-center';
</script>

<div class={`backgroundMask type-${type}`} style={`width: ${size}px; height: ${size}px;`} />

<style lang="scss">
	.backgroundMask {
		flex-shrink: 0;
	}

	.type-radial-center {
		background: radial-gradient(50% 50% at 50% 50%, #000 0%, rgba(0, 0, 0, 0) 100%);
	}

	.type-radial-down {
		background: radial-gradient(52.19% 100% at 50% 0%, #000 0%, rgba(0, 0, 0, 0) 95.31%);
	}
	.type-radial-up {
		background: radial-gradient(52.18% 100% at 50% 100%, #000 0%, rgba(0, 0, 0, 0) 95.83%);
	}
	.type-linear-down {
		background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0) 99.11%);
	}
	.type-linear-up {
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 99.11%);
	}
</style>
