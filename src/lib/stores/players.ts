import { schemaPlayerArr, type IPlayer } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

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
				dq: false
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

	return {
		subscribe,
		set,
		update,
		updatePlayer,
		add,
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
