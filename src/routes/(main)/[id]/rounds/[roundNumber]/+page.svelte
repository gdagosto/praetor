<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import '$lib/db/db.svelte';
	import type { IDbTable } from '$lib/db/db.svelte';
	import { generateRound } from '$lib/seatings/seatingsController';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import type { PageProps } from './$types';
	import TableReport from './_components/table-report.svelte';

	let { data }: PageProps = $props();

	let tableReportOpen = $state(false);
	let tableReportTable: IDbTable | undefined = $state();

	function onGenerateRound() {
		console.debug('ON_GENERATE_ROUND', data.roundNumber);
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
							<Badge variant="outline" class="rounded-md w-10 justify-center">{tablePlayer.vp}</Badge>
							<span class="text-md">{player?.fullName}</span>
						</div>
					{/each}
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</ScrollArea>

<Button onclick={onGenerateRound} class="m-2">Gerar round</Button>

{#if tableReportTable}
	<TableReport bind:open={tableReportOpen} table={tableReportTable} />
{/if}
