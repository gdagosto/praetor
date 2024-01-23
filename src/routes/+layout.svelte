<script lang="ts">
	import '$lib/style/global.css';
	import 'overlayscrollbars/overlayscrollbars.css';
	import SidebarNavigation from '$lib/components/SidebarNavigation/SidebarNavigation.svelte';
	import { stPreferences, stPlayers, stRounds } from '$lib/stores';
	import ClipboardList from 'lucide-svelte/icons/clipboard-list';
	import Settings from 'lucide-svelte/icons/settings';
	import Swords from 'lucide-svelte/icons/swords';
	import type { INavItem } from '$lib/types';
	import { LogoPraetor } from '$lib/components';
	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit';
	import { i18n } from '$lib/i18n.js';
	import * as m from '$paraglide/messages.js';
	import { onSetLanguageTag } from '$paraglide/runtime';
	import { playerDB } from '$lib/vekn';

	playerDB.populatePlayerDB();

	function generateNavItems(): INavItem[] {
		return [
			{
				id: 'summary',
				icon: ClipboardList,
				text: m.navItemSummary(),
				badge: $stPlayers.length,
				onClick: () => stPreferences.gotoLangRoute('/summary')
			},
			{
				id: 'rounds',
				icon: Swords,
				text: m.navItemRounds(),
				onClick: () => stPreferences.gotoLangRoute('/rounds')
			},
			{
				id: 'settings',
				icon: Settings,
				text: m.navItemSettings(),
				position: 'footer',
				onClick: () => stPreferences.gotoLangRoute('/settings')
			}
		];
	}

	onSetLanguageTag(() => {
		navItems = generateNavItems();
	});

	let navItems: INavItem[];

	$: navItems = generateNavItems();

	stRounds.set([]);
	stRounds.add();
	stRounds.add();
	stRounds.add();
</script>

<ParaglideJS {i18n} languageTag={$stPreferences.lang}>
	<main class:dark-mode={$stPreferences.darkMode}>
		<SidebarNavigation items={navItems}>
			<LogoPraetor slot="header" />
		</SidebarNavigation>
		<div class="content">
			<slot />
		</div>
	</main>
</ParaglideJS>

<style lang="scss">
	main {
		height: 100dvh;
		width: 100%;
		display: flex;
		// flex-direction: column;
		align-items: stretch;

		overflow: hidden;

		border-radius: var(--radius-none, 0px);
		background: var(--color-bg-primary, #0c111d);
	}

	.content {
		width: 100%;
		// height: 1px;
		flex: 1 1 0;
		display: flex;
		align-items: stretch;
	}
</style>
