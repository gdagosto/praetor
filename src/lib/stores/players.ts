import { schemaPlayerArr, type IPlayer } from '$lib/types';
import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { stRounds } from '.';

const defaultValue: IPlayer[] = [];

function createPlayers() {
	const initialValue = defaultValue;

	const { subscribe, set, update } = writable<IPlayer[]>(initialValue);

	const updatePlayer = (id: number, data: Partial<IPlayer>) => {
		update((players) => {
			players[id] = {
				...players[id],
				...data
			};
			return players;
		});
	};

	const add = (id: number, firstName: string, lastName: string) => {
		update((players) => {
			players.push({
				id,
				firstName,
				lastName,
				gw: 0,
				vp: 0,
				tp: 0,
				coin: 0,
				vpFinals: 0,
				dq: false,
				wd: false
			});
			return players;
		});
	};

	const remove = (idx: number) => {
		update((players) => {
			players.splice(idx, 1);
			return players;
		});
	};

	const resetDQ = () => {
		update((players) => {
			for (let i = 0, iMax = players.length; i < iMax; i++) {
				players[i].dq = false;
				players[i].wd = false;
			}
			return players;
		});
	};

	const updateResults = () => {
		const rounds = get(stRounds);
		const playersById: Record<number, { vp: number; gw: number; tp: number; vpFinals: number }> =
			{};

		update((players) => {
			players.forEach((p) => {
				playersById[p.id] = { vp: 0, gw: 0, tp: 0, vpFinals: 0 };
			});

			const finalRound = rounds.length - 1;
			rounds.forEach((r, idx) => {
				r.tables.forEach((t) => {
					t.players.forEach((p) => {
						playersById[p.id].vp += p.vp;
						playersById[p.id].gw += p.gw;
						playersById[p.id].tp += p.tp;

						if (idx == finalRound) {
							playersById[p.id].vpFinals += p.vp;
						}
					});
				});
			});

			players.forEach((p, idx) => {
				players[idx].vp = playersById[p.id].vp;
				players[idx].gw = playersById[p.id].gw;
				players[idx].tp = playersById[p.id].tp;
			});

			return players;
		});
	};

	return {
		subscribe,
		set,
		update,
		updatePlayer,
		updateResults,
		add,
		resetDQ,
		remove
	};
}

export const stPlayers = createPlayers();

if (browser) {
	const storedValue = JSON.parse(window.localStorage?.getItem('players') ?? '[]');
	if (storedValue) {
		const parsedVal = schemaPlayerArr.safeParse(storedValue);
		if (parsedVal.success) stPlayers.set(parsedVal.data);
	}

	stPlayers.subscribe((value) => window.localStorage.setItem('players', JSON.stringify(value)));
}
