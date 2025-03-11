<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { stFinals } from '$lib/stores/finals.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';

	/** Steps:
	 * 1) Check if finals is already generated
	 * 2) Check if any tie-breakers are needed for the finalists
	 * 3) Do the tiebrekers
	 * 4) Show the final 5
	 */

	async function generateFinals() {
		console.debug('GENERATE_FINALS');
		// Verify needed tiebreakers
		await stTournament.updateStandings();
		await stFinals.generatePlacements();
		await stFinals.generateTiebreakers();

		if (stFinals.ties.length > 0) {
			goto('finals/tiebreaker');
		} else {
			goto('finals/seatings');
		}
	}

	$inspect('TIES', stFinals.ties);
</script>

{#if stTournament.currentRound.current === 100}
	Finals already generated
	<!-- content here -->
{:else}
	<div class="flex h-full w-full items-center justify-center">
		<Button onclick={generateFinals}>Gerar finais</Button>
	</div>
{/if}
