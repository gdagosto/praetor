<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import {
    	Button,
    	buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as Drawer from "$lib/components/ui/drawer/index.js";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import * as m from '$lib/paraglide/messages.js';
    import { cn, isDesktop } from "$lib/utils";
    
    let open = $state(false);

    function onImportVekn() {
        goto(`${base}/import/vekn`)
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
      {@render content()}
     </Dialog.Content>
    </Dialog.Root>
   {:else}
    <Drawer.Root bind:open dismissible={false}>
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
{m.add_player_title()}
{/snippet}


{#snippet description()}
{m.add_player_description()}
{/snippet}

{#snippet content(drawer = false)}
   <form class={cn("grid items-start gap-4", drawer && 'px-4')}>
    <Label for='add-player-name'>{m.add_player_input_name_label()}</Label>
    <!-- <Autocomplete id='add-player-name' autoOpen/> -->
    <!-- <Input id='add-player-name' placeholder={m.add_player_input_name_placeholder()}/> -->
    <Label for='add-player-id'>{m.add_player_input_id_label()}</Label>
    <Input id='add-player-id' placeholder={m.add_player_input_id_placeholder()}/>
    <Button onclick={onImportVekn}>{m.confirm()}</Button>
   </form>
{/snippet}