import SeatingGenerator from './class.js';
import type { IPlayer } from '$lib/types/player.js';

export class Generator {
	sg: SeatingGenerator;

	constructor() {
		this.sg = new SeatingGenerator(5, 3);
	}

	generateRound(roundNum: number, players: IPlayer[]) {
		// Update player count on sg
		this.sg.playerCount = players.length;

		// Get all players currently not disqualified
		const activePlayers = players.reduce(
			(active, p, idx) => {
				if (p.dq === false) {
					active.push(idx);
				}

				return active;
			},
			<number[]>[]
		);

		this.sg.rounds[roundNum] = this.sg.tablesFromPlayers(activePlayers);

		console.log(`Generating round for ${this.sg.playerCount} players`);
		console.log(players);

		return this.sg.generateRoundSeatings(roundNum + 1);
	}
}

const generator = new Generator();
export default generator;
