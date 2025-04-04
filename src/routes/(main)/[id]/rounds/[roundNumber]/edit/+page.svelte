<script lang="ts">
	import { Combobox } from '$lib/components/combobox';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import '$lib/db/db.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { stPlayers } from '$lib/stores/players.svelte';
	import { stTournament } from '$lib/stores/tournament.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const roundTables = $state(
		stTournament.tables.current.filter((t) => t.roundNum === data.roundNumber)
	);
	const options = stPlayers.players.current.map((p) => ({
		value: String(p.id),
		label: p.fullName
	}));

	let value = $state('');

	$inspect('tables', roundTables);

	function onchange(tableIdx: number, playerIdx: number, newPlayerIdxText: string) {
		console.debug('ON_CHANGE', tableIdx, playerIdx, newPlayerIdxText);
		// Swap players around. If you put a player on a new table id, get this player and put it on the old players position
		const newPlayerId = Number(newPlayerIdxText);
		const oldPlayerId = roundTables[tableIdx].players[playerIdx].playerId;
		if (oldPlayerId === newPlayerId) return;

		// Locate where the player who was swapped to his new position was located, and swap it with the old player Id.
		for (let i = 0, iMax = roundTables.length; i < iMax; i++) {
			const oldTable = roundTables[i];
			const oldPlayerIdx = oldTable.players.findIndex((p) => p.playerId === newPlayerId);
			if (oldPlayerIdx !== -1) {
				console.debug('Located player position in', i, playerIdx);
				roundTables[tableIdx].players[playerIdx].playerId = newPlayerId;
				roundTables[i].players[oldPlayerIdx].playerId = oldPlayerId;

				// Report old table with the player changed
				stTournament.reportRoundTable(
					data.roundNumber,
					oldTable.tableNum,
					$state.snapshot(oldTable.players),
					oldTable.winnerId
				);

				// If the tables are different, report the new table also
				if (tableIdx !== i) {
					const newTable = roundTables[tableIdx];
					stTournament.reportRoundTable(
						data.roundNumber,
						newTable.tableNum,
						$state.snapshot(newTable.players),
						newTable.winnerId
					);
				}
				return;
			}
		}
	}
</script>

<ScrollArea>
	<div class="flex flex-col gap-4 p-2 pb-20">
		{#each roundTables as table, tableIdx}
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-xl leading-none">
						{m.round_table_name({ n: table.tableNum })}
					</Card.Title>
				</Card.Header>
				<Card.Content class="flex flex-col p-4">
					{#each table.players as tablePlayer, playerIdx}
						<div class="align-center flex justify-start gap-2 rounded-md p-2">
							<Combobox
								{options}
								value={String(tablePlayer.playerId)}
								onchange={(playerId) => onchange(tableIdx, playerIdx, playerId)}
							></Combobox>
						</div>
					{/each}
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</ScrollArea>
