<script lang="ts">
	import EventList from "$lib/components/event-list/event-list.svelte";
	import EventNew from "$lib/components/event-new/event-new.svelte";


</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<EventList items={[]}/>
<EventNew/>