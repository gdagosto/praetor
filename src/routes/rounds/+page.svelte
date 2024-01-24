<script lang="ts">
	import { Tabs } from '$lib/components/index.js';
	import { stCurrentPage, stCurrentTabRound, stTourneySettings } from '$lib/stores/index.js';
	import type { ITabItem } from '$lib/types';
	import Round from './components/Round.svelte';
	import { stRounds } from '$lib/stores/index.js';
	import * as m from '$paraglide/messages.js';

	// Save current page
	stCurrentPage.set('rounds');
	let tabItems: ITabItem[];

	$: tabItems = [...new Array($stTourneySettings.rounds)].map((_, idx) => ({
		id: idx,
		text: m.roundsname({ roundNum: idx + 1 }),
		onClick: () => stCurrentTabRound.set(idx)
	}));
</script>

<div class="wrapper">
	<div class="tabs">
		<Tabs items={tabItems} fullWidth size="sm" stCurrentId={stCurrentTabRound} />
	</div>
	{#if $stRounds[$stCurrentTabRound]}
		<Round idRound={$stCurrentTabRound} />
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		padding: 32px var(--spacing-4xl) var(--spacing-6xl, 48px) var(--spacing-4xl);
		flex-direction: column;
		align-items: center;
		gap: 32px;
		flex: 1 0 0;

		.tabs {
			width: 100%;
			z-index: 3;
		}
	}
</style>
