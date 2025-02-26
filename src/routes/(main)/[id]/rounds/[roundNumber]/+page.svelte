<script lang="ts">
    import { Button } from "$lib/components/ui/button";
import "$lib/db/db.svelte";
	import { generateRound } from "$lib/seatings/seatingsController";
	import type { PageProps } from '../../rounds/[roundNumber]/$types';

	let { data }: PageProps = $props();

	function onGenerateRound() {
		console.debug('ON_GENERATE_ROUND', data.roundNumber - 1)
		generateRound(data.roundNumber -1 )
	}
</script>


{data.roundNumber}

<Button onclick={onGenerateRound} class='m-2'>Gerar round</Button>