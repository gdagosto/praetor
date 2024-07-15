<script lang="ts">
	import { Button } from '$lib/components';
	import { stPlayers, stRounds } from '$lib/stores';
	import { downloadTournamentFile, uploadTournamentFile } from '$lib/utils/import';

	async function onClick() {
		console.log('stRounds', $stRounds);
		console.log('stPlayers', $stPlayers);
		downloadTournamentFile();
	}

	async function onClick2() {
		console.log('stRounds', $stRounds);
		console.log('stPlayers', $stPlayers);
		uploadTournamentFile();
	}
</script>

<div class="wrapper">
	<Button on:click={onClick} text="GENERATE ARCHON DATA"></Button>
	<Button on:click={onClick2} text="IMPORT DATA"></Button>
</div>

<style lang="scss">
</style>
