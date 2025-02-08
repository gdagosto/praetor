<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as Drawer from "$lib/components/ui/drawer/index.js";
    import {
     Button,
     buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as m from '$lib/paraglide/messages.js'
	import { cn, isDesktop } from "$lib/utils";
	import { goto } from "$app/navigation";
	import { stTournament } from "$lib/stores/tournament.svelte";

    let {open = $bindable(false), data} = $props();

    function onConfirm() {
        stTournament.setInfo(data);
        goto(`/tournament`)
    }

   </script>
    
   {#if isDesktop.current}
    <Dialog.Root bind:open>
     <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
       <Dialog.Title>{@render title()}</Dialog.Title>
       <Dialog.Description>
        {@render description()}
       </Dialog.Description>
      </Dialog.Header>
      {@render content()}
     </Dialog.Content>
    </Dialog.Root>
   {:else}
    <Drawer.Root bind:open>
     <Drawer.Content>
      <Drawer.Header class="text-left">
       <Drawer.Title>{@render title()}</Drawer.Title>
       <Drawer.Description>
        {@render description()}
       </Drawer.Description>
      </Drawer.Header>

      {@render content(true)}
      <Drawer.Footer class="pt-4">
       <Drawer.Close class={buttonVariants({ variant: "secondary" })}
        >{m.drawer_cancel()}</Drawer.Close
       >
      </Drawer.Footer>
     </Drawer.Content>
    </Drawer.Root>
   {/if}





{#snippet title()}
{m.add_event_vekn_confirm_dialog_title()}
{/snippet}


{#snippet description()}
{m.add_event_vekn_confirm_dialog_description()}
{/snippet}

{#snippet content(drawer = false)}
    <div class={cn('flex flex-col gap-4', drawer && 'px-4')}>
    <div class={cn('grid grid-cols-[max-content_1fr] gap-2 items-center')}>
        <div class='text-muted-foreground text-sm text-right'>{m.add_event_vekn_confirm_dialog_event_name()}</div>
        <div class='font-semibold'>{data.event_name}</div>
        <div  class='text-muted-foreground text-sm text-right'>{m.add_event_vekn_confirm_dialog_event_rounds()}</div>
        <div class='font-semibold'>{data.rounds}</div>
        
    </div>
    <Button onclick={onConfirm}>{m.add_event_vekn_confirm_dialog_event_confirm()}</Button>
</div>
{/snippet}