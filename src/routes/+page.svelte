<script lang="ts">
	import { getPlayerRegistryData } from '$lib/vekn';

	async function getPlayer(id: number) {
		const data = getPlayerRegistryData(id);
		console.log((await data).city);
	}

	getPlayer(6130073);
</script>

<div class="wrapper"></div>

<style lang="scss">
</style>
