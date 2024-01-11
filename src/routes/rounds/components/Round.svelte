<script lang="ts">
	import { stRounds } from '$lib/stores';
	import { RoundState, type IRoundState } from '$lib/types';
	import EmptyRound from './EmptyRound.svelte';
	import RoundTableCard from './RoundTableCard.svelte';
	import ModalTableReport from './ModalTableReport.svelte';
	import { writable } from 'svelte/store';
	import { generateRound, generationProgress } from '$lib/seatings/generator';
	import GeneratingRound from './GeneratingRound.svelte';
	import { fly } from 'svelte/transition';

	export let idRound: number;

	let showModalReport: () => void;
	let idSelectedTable = -1;
	let state: IRoundState | 'transitioning';
	let futureState: IRoundState;
	const stHasOutro = writable<boolean>(false);

	$: data = $stRounds[idRound];

	function onClickGenerate() {
		generateRound(idRound);
	}

	function onClickTable(idTable: number) {
		idSelectedTable = idTable;
		showModalReport();
	}

	$: onFutureState(data.state);

	function onFutureState(nextState: IRoundState) {
		if ($stHasOutro) {
			state = 'transitioning';
			futureState = nextState;
		} else {
			state = nextState;
		}
	}

	function onOutroEnd() {
		state = futureState;
		stHasOutro.set(false);
	}
</script>

<div class="wrapper">
	{#if state === RoundState.Empty}
		<EmptyRound on:generate={onClickGenerate} {stHasOutro} on:outroend={onOutroEnd} />
	{:else if state === 'transitioning'}
		<!-- Empty block-->
	{:else if state === RoundState.Generating}
		<GeneratingRound {stHasOutro} stProgress={generationProgress} on:outroend={onOutroEnd} />
		<!-- Empty block-->
	{:else}
		<div class="roundTables" in:fly={{ duration: 300, y: 20 }}>
			{#each data.tables as table, idx}
				<RoundTableCard data={table} tableNum={idx + 1} on:click={() => onClickTable(idx)} />
			{/each}
		</div>
	{/if}
</div>

<ModalTableReport bind:showModal={showModalReport} {idRound} idTable={idSelectedTable} />

<style lang="scss">
	.wrapper {
		z-index: 0;
		flex: 1 0 0;
		display: flex;
		flex-direction: column;
		width: 100%;

		color: var(--color-text-primary);
	}

	.roundTables {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: flex-start;
		gap: var(--spacing-xl);
		width: 100%;
	}
</style>
