<script lang="ts">
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { stTournament, stTournaments } from "$lib/stores/tournament.svelte";
	import Check from "lucide-svelte/icons/check";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import GalleryVerticalEnd from "lucide-svelte/icons/gallery-vertical-end";

	let {closeSidebar}: {closeSidebar: CallableFunction} = $props();
	
	function onSelect(id: number) {
		closeSidebar();
		goto(`${base}/${id}`);
	}

</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<div
							class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
						>
							<GalleryVerticalEnd class="size-4" />
						</div>
						<div class="flex flex-col gap-0.5 leading-none">
							<span class="font-semibold">{stTournament.info.current.name}</span>
						</div>
						<ChevronsUpDown class="ml-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-[--bits-dropdown-menu-anchor-width]" align="start">
				{#each stTournaments.current ?? [] as t (t.id)}
					<DropdownMenu.Item onSelect={() => onSelect(t.id)}>
						{t.name}
						{#if t.id === stTournament.info.current.id}
							<Check class="ml-auto" />
						{/if}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>