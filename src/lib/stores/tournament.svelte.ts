import type { ITournamentRawData } from '$lib/types';

class StTournament {
	info = $state({
		id: 0,
		name: '',
		rounds: 0,
		hasFinals: false
	});

	setInfo(data: ITournamentRawData) {
		const [rounds, final] = data.rounds.split('R');

		this.info = {
			id: data.event_id,
			name: data.event_name,
			rounds: Number(rounds),
			hasFinals: final === '+F'
		};
	}

	loadInfo(info: typeof this.info) {
		console.log('LOAD_INFO');
		this.info = info;
	}
}

export const stTournament = new StTournament();
