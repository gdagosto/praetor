<script lang="ts">
    import "$lib/db/db.svelte";
	import type { PageProps } from '../../rounds/[roundNumber]/$types';

	let { data }: PageProps = $props();

    
    $inspect('page-x-loaded')
</script>


{data.roundNumber}