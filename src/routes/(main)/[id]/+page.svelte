<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import '$lib/db/db.svelte';
	import { veknReport } from '$lib/utils/report';

	function finals() {
		console.log(veknReport());
	}
</script>

Oi

<Button onclick={finals}>Finals</Button>
