import Swords from '@lucide/svelte/icons/swords';
import Trophy from '@lucide/svelte/icons/trophy';
import * as m from '$lib/paraglide/messages.js';

class StPages {
	data = $state([
		{
			title: m.sidebar_group_information,
			url: '#',
			icon: Trophy,
			items: [
				{
					title: m.sidebar_information_tournament_info,
					url: ''
				},
				{
					title: m.sidebar_information_players,
					url: 'players'
				},
				{
					title: m.sidebar_information_standings,
					url: 'standings'
				}
			]
		},
		{
			title: m.sidebar_group_rounds,
			icon: Swords,
			url: '#',
			items: []
		}
	]);

	current = $state('');

	setRounds(rounds: number, hasFinals: boolean) {
		console.debug('SET_ROUNDS', rounds, hasFinals);
		const roundsData = [];

		for (let i = 1; i <= rounds; i++) {
			roundsData.push({
				title: () => m.sidebar_rounds_round({ n: i }),
				url: `rounds/${i}`
			});
		}

		if (hasFinals) {
			roundsData.push({
				title: m.sidebar_rounds_finals,
				url: 'rounds/finals'
			});
		}

		this.data[1].items = roundsData;
	}
}

export const stPages = new StPages();
