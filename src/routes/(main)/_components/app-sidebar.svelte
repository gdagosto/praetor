<script lang="ts">
  	import { useSidebar } from "$lib/components/ui/sidebar/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import { page } from '$app/state';
	import { stPages } from "$lib/stores/sidebar.svelte";
	import { stTournament } from "$lib/stores/tournament.svelte";
	import TournamentSwitcher from "./tournament-switcher.svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	let sidebar = useSidebar();

	function close() {
		sidebar.setOpenMobile(false);
	}

	function tournamentURL(url: string) {
		return `/${stTournament.id}/${url}`;
	}
</script>


<Sidebar.Root {...restProps} collapsible='offcanvas' bind:ref>
	<Sidebar.Header>
		<TournamentSwitcher closeSidebar={close}/>
	</Sidebar.Header>
	<Sidebar.Content>
		<!-- We create a Sidebar.Group for each parent. -->
		{#each stPages.data as group (group.title)}

			<Sidebar.Group>
				<Sidebar.GroupLabel class='gap-2'>
					<group.icon/>
					<span>{group.title}</span>
					</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={page.url.pathname === item.url}>
									{#snippet child({ props })}
										<a href={tournamentURL(item.url)} onclick={close} {...props}>{item.title}</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>