import SeatingGenerator from './class.js';
import type { IPlayer } from '$lib/types/player.js';
import type { IRoundTable } from '$lib/types/round.js';

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

	reset() {
		this.sg.reset();
	}

	importRound(roundNum: number, players: IPlayer[], roundTables: IRoundTable[]) {
		// Create a player mapping
		const playerMap = players.reduce<Record<number, number>>((dict, p, idx) => {
			dict[p.id] = idx;
			return dict;
		}, {});

		this.sg.rounds[roundNum] = roundTables.map((table) =>
			table.players.map((player) => playerMap[player.id])
		);

		console.log(this.sg.rounds[roundNum]);
	}
}

const generator = new Generator();
export default generator;
