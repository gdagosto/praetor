<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import type { LayoutProps } from './$types';
	import { AppSidebar } from '../_components/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import { stPages } from '$lib/stores/sidebar.svelte';

	let { children, data }: LayoutProps = $props();

	$effect(() => {
		stTournament.id = data.id;
	});

	$effect(() => {
		stPages.setRounds(stTournament.info.current.rounds, stTournament.info.current.hasFinals);
	});
</script>

<Toaster />

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<!-- <Breadcrumb.Item class="hidden md:block">
						<Breadcrumb.Link href="#">Building Your Application</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="hidden md:block" /> -->
					<Breadcrumb.Item>
						<Breadcrumb.Page>{stPages.current}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<div class="flex h-1 flex-1 flex-col">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
