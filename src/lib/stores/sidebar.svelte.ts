import Swords from 'lucide-svelte/icons/swords';
import Trophy from 'lucide-svelte/icons/trophy';

class StPages {
	data = $state([
		{
			title: 'Information',
			url: '#',
			icon: Trophy,
			items: [
				{
					title: 'Tournament Info',
					url: 'info'
				},
				{
					title: 'Players',
					url: 'players'
				},
				{
					title: 'Standings',
					url: 'standings'
				}
			]
		},
		{
			title: 'Rounds',
			icon: Swords,
			url: '#',
			items: []
		}
	]);

	setRounds(rounds: number, hasFinals: boolean) {
		let roundsData = [];

		for (let i = 1; i <= rounds; i++) {
			roundsData.push({
				title: `Round ${i}`,
				url: `rounds/${i}`
			});
		}

		if (hasFinals) {
			roundsData.push({
				title: 'Finals',
				url: 'rounds/finals'
			});
		}

		this.data[1].items = roundsData;
	}
}

export const stPages = new StPages();
