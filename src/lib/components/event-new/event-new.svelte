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
    
    let open = false;

    function onImportVekn() {
        goto('/import/vekn')
    }
   </script>
    
   {#if isDesktop.current}
    <Dialog.Root bind:open>
     <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
        {@render title()}
    </Dialog.Trigger>
     <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
       <Dialog.Title>{@render title()}</Dialog.Title>
       <Dialog.Description>
        {@render description()}
       </Dialog.Description>
      </Dialog.Header>
      {@render form()}
     </Dialog.Content>
    </Dialog.Root>
   {:else}
    <Drawer.Root bind:open>
     <Drawer.Trigger class={buttonVariants({ variant: "outline" })}
      >{@render title()}</Drawer.Trigger
     >
     <Drawer.Content>
      <Drawer.Header class="text-left">
       <Drawer.Title>{@render title()}</Drawer.Title>
       <Drawer.Description>
        {@render description()}
       </Drawer.Description>
      </Drawer.Header>

      {@render form(true)}
      <Drawer.Footer class="pt-4">
       <Drawer.Close class={buttonVariants({ variant: "secondary" })}
        >Cancel</Drawer.Close
       >
      </Drawer.Footer>
     </Drawer.Content>
    </Drawer.Root>
   {/if}





{#snippet title()}
{m.add_event_title()}
{/snippet}


{#snippet description()}
{m.add_event_description()}
{/snippet}

{#snippet form(drawer = false)}
   <form class={cn("grid items-start gap-4", drawer && 'px-4')}>
    <Button onclick={onImportVekn}>{m.add_event_button_import_vekn()}</Button>
    <Button  disabled>{m.add_event_button_import_praetor()}</Button>
   </form>
{/snippet}