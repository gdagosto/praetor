<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import RoundDeleteDialog from './_components/round-delete-dialog.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { copyText } from 'svelte-copy';
	import '$lib/db/db.svelte';
	import type { IDbTable } from '$lib/db/db.svelte';
	import { generateRound } from '$lib/seatings/seatingsController';
	import { stFinals } from '$lib/stores/finals.svelte';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';
	import TableReport from './_components/table-report.svelte';
	import DropdownEditRound from './_components/dropdown-edit-round.svelte';
	import * as m from '$lib/paraglide/messages.js';

	let { data }: PageProps = $props();

	let tableReportOpen = $state(false);
	let roundDeleteOpen = $state(false);
	let tableReportTable: IDbTable | undefined = $state();

	function oneditRound() {
		console.debug('ON_EDIT_ROUND', data.roundNumber);
		goto(`${base}/${stTournament.id}/rounds/${data.roundNumber}/edit`);
	}

	function ondeleteRound() {
		console.debug('ON_DELETE_ROUND', data.roundNumber);
		roundDeleteOpen = true;
	}

	function onexportRound(results = false) {
		console.debug('ON_EXPORT_ROUND', data.roundNumber, results, typeof results);

		let exportedText = `${m.round_name({n: data.roundNumber})}`

		// We build a message to be sent via text chat so that players can figure out their tables, or round results
		roundTables.forEach((table) => {
			exportedText += `\n\n${m.round_table_name({n: table.tableNum})}`

			table.players.forEach((player) => {
				exportedText += `\n${stPlayers.getById(player.playerId)?.fullName}`
				if (results) {
					exportedText += `- ${player.vp}VP`
					if (player.playerId === table.winnerId) exportedText += ' 1GW'
				}
			})
		});

		copyText(exportedText)
			.then(() => {
				toast.success(m.round_export_success_message());
			})
			.catch((err) => {
				toast.error(`${m.round_export_error_message()} - ${err.message}`);
			});
	}

	$inspect(stTournament.currentRound.current);

	async function onGenerateFinals() {
		console.debug('GENERATE_FINALS');
		// Verify needed tiebreakers
		await stTournament.updateStandings();
		await stFinals.generatePlacements();
		await stFinals.generateTiebreakers();

		if (stFinals.ties.length > 0) {
			goto(`${base}/${stTournament.id}/rounds/finals/tiebreaker`);
		} else {
			goto(`${base}/${stTournament.id}/rounds/finals/placements`);
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

	const roundTables = $derived(
		stTournament.tables.current.filter((t) => t.roundNum === data.roundNumber)
	);

	function onclickTable(table: IDbTable) {
		console.debug('ON_CLICK_TABLE', $state.snapshot(table));
		tableReportTable = table;
		tableReportOpen = true;
	}
</script>

<ScrollArea>
	<div class="flex flex-col gap-4 p-2 pb-20">
		{#each roundTables as table}
			<Card.Root onclick={() => onclickTable(table)}>
				<Card.Header>
					<Card.Title class="text-xl leading-none">
						{m.round_table_name({ n: table.tableNum })}
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

<footer class="fixed right-0 bottom-0 mt-auto flex justify-end p-4">
	{#if stTournament.currentRound.current >= data.roundNumber}
		<DropdownEditRound ondelete={ondeleteRound} onedit={oneditRound} onexport={onexportRound} />
	{:else}
		<Button onclick={onGenerateRound}>Gerar rodada</Button>
	{/if}
</footer>

{#if tableReportTable}
	<TableReport bind:open={tableReportOpen} table={tableReportTable} />
{/if}

<RoundDeleteDialog
	bind:open={roundDeleteOpen}
	onDelete={() => stTournament.deleteRound(data.roundNumber)}
/>
