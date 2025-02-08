<script lang="ts">
	import ScrollArea from "../ui/scroll-area/scroll-area.svelte";
    
    let {items}  = $props();
</script>

<ScrollArea>
    <div class='flex flex-col gap-2 p-4 pt-0'>
        {#each items as item}
             <button>

             </button>
        {/each}
    </div>
</ScrollArea>