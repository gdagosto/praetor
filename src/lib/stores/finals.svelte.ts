import { db, type IDbStanding } from '$lib/db/db.svelte';
import { stateQuery } from '$lib/utils/stateQuery.svelte';
import { stTournament } from './tournament.svelte';

interface ITie {
	placement: number;
	players: IDbStanding[];
}

interface IFinalsPlacements {
	placement: number;
	playerId: number;
	standingId: number;
}

class StFinals {
	ties = $state<ITie[]>([]);
	placements = $state<IFinalsPlacements[]>([]);
	finalists = stateQuery<IDbStanding[]>(
		[],
		async () =>
			(await db.standings.where('tournamentId').equals(stTournament.id).sortBy('placement')).slice(
				0,
				5
			),
		() => [stTournament.id]
	);

	generatePlacements = async () => {
		// Don't trust liveQueries, as they might is probably stale when this is called
		const standings = await db.standings
			.where('tournamentId')
			.equals(stTournament.id)
			.sortBy('placement');

		// Initialize placements with first 5 from normal standings
		this.placements = standings
			.slice(0, 5)
			.map((s, idx) => ({ placement: idx + 1, playerId: s.playerId, standingId: s.id }));
	};

	generateTiebreakers = async () => {
		// Don't trust liveQueries, as they might is probably stale when this is called
		const standings = await db.standings
			.where('tournamentId')
			.equals(stTournament.id)
			.sortBy('placement');

		const ties: ITie[] = [];
		let tie: ITie = {
			placement: 1,
			players: [standings[0]]
		};
		for (let i = 1, iMax = standings.length; i < iMax; i++) {
			const player = standings[i];
			if (player.placement !== tie.placement) {
				if (tie.players.length > 1) {
					ties.push(tie);
				}

				if (player.placement > 5) break;

				tie = {
					placement: player.placement,
					players: [player]
				};

				continue;
			}

			tie.players.push(player);
		}

		this.ties = ties;
	};

	finalizeTiebreakers = () => {
		const { placements } = this;
		const standingIds = placements.map((p) => p.standingId);

		console.debug('AUX_1', standingIds);

		// Check tiebreakers for fixes
		for (let i = 0, iMax = this.ties.length; i < iMax; i++) {
			const tie = this.ties[i];
			for (let j = 0, jMax = tie.players.length; j < jMax; j++) {
				const pos = tie.placement + j - 1;
				const standingId = tie.players[j].id;

				standingIds[pos] = standingId;
				console.debug('AUX_2', tie.players[j], pos, standingIds);
				if (pos >= 5) continue;
				placements[pos].playerId = tie.players[j].playerId;
				placements[pos].standingId = standingId;
			}
		}

		console.debug('FINAL_PLACEMENTS', $state.snapshot(placements), standingIds);

		// Now, update the standings to show players as finalists
		stTournament.selectFinalists(standingIds);
	};
}

export const stFinals = new StFinals();
