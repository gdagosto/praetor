<script lang="ts">
	import { goto } from '$app/navigation';
	import RoundDeleteDialog from '$lib/components/round-delete-dialog/round-delete-dialog.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import '$lib/db/db.svelte';
	import type { IDbTable } from '$lib/db/db.svelte';
	import { generateRound } from '$lib/seatings/seatingsController';
	import { stFinals } from '$lib/stores/finals.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import type { PageProps } from './$types';
	import TableReport from './_components/table-report.svelte';
	import { toast } from 'svelte-sonner';

	let { data }: PageProps = $props();

	let tableReportOpen = $state(false);
	let roundDeleteOpen = $state(false);
	let tableReportTable: IDbTable | undefined = $state();

	function onDeleteRound() {
		console.debug('ON_DELETE_ROUND', data.roundNumber);
		roundDeleteOpen = true;
	}

	$inspect(stTournament.currentRound.current);

	async function onGenerateFinals() {
		console.debug('GENERATE_FINALS');
		// Verify needed tiebreakers
		await stTournament.updateStandings();
		await stFinals.generatePlacements();
		await stFinals.generateTiebreakers();

		if (stFinals.ties.length > 0) {
			goto('finals/tiebreaker');
		} else {
			goto('finals/seatings');
		}
	}

	function onGenerateRound() {
		if (data.roundNumber === 100) return onGenerateFinals();

		console.debug('ON_GENERATE_ROUND', data.roundNumber, stPlayers.ids.length);
		const activePlayers = stTournament.standings.current.filter(
			(s) => s.status !== 'dq' && s.status !== 'wd'
		);

		if (activePlayers.length < 4) {
			toast.error('São necessários pelo menos 4 jogadores ativos para começar um round');
			return;
		}

		// Verify if round has already started. If it did,

		generateRound(data.roundNumber);
	}

	let roundTables: IDbTable[] = $state([]);

	$effect(() => {
		roundTables = stTournament.tables.current.filter((t) => t.roundNum === data.roundNumber);
	});

	function onclickTable(table: IDbTable) {
		console.debug('ON_CLICK_TABLE', $state.snapshot(table));
		tableReportTable = table;
		tableReportOpen = true;
	}
</script>

<ScrollArea>
	<div class="flex flex-col gap-4 p-4">
		{#each roundTables as table}
			<Card.Root onclick={() => onclickTable(table)}>
				<Card.Header>
					<Card.Title class="text-xl leading-none">
						Mesa {table.tableNum}
					</Card.Title>
				</Card.Header>
				<Card.Content class="flex flex-col p-4">
					{#each table.players as tablePlayer}
						{@const player = stPlayers.getById(tablePlayer.playerId)}
						<div class="align-center flex justify-start gap-2 rounded-md p-2">
							<Badge variant="outline" class="w-10 justify-center rounded-md">
								{tablePlayer.vp}
							</Badge>
							<span class="text-md">{player?.fullName}</span>
						</div>
					{/each}
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</ScrollArea>

{#if stTournament.currentRound.current >= data.roundNumber}
	<Button
		variant="destructive"
		class="m-2 mt-auto"
		onclick={onDeleteRound}
		disabled={stTournament.currentRound.current > data.roundNumber}>Deletar rodada</Button
	>
{:else}
	<Button class="m-2 mt-auto" onclick={onGenerateRound}>Gerar rodada</Button>
{/if}

{#if tableReportTable}
	<TableReport bind:open={tableReportOpen} table={tableReportTable} />
{/if}

<RoundDeleteDialog
	bind:open={roundDeleteOpen}
	onDelete={() => stTournament.deleteRound(data.roundNumber)}
/>
