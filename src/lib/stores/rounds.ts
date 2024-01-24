import { type IRound, RoundState, schemaRounds, type IRoundTable } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue: IRound[] = [];

function createRounds() {
	const initialValue = structuredClone(defaultValue);

	const { subscribe, set, update } = writable<IRound[]>(initialValue);

	const updateRound = (id: number, data: Partial<IRound>) => {
		update((rounds) => {
			rounds[id] = {
				...rounds[id],
				...data
			};
			return rounds;
		});
	};

	const updateTable = (roundId: number, tableId: number, data: Partial<IRoundTable>) => {
		update((rounds) => {
			rounds[roundId].tables[tableId] = {
				...rounds[roundId].tables[tableId],
				...data
			};

			return rounds;
		});
	};

	const add = () => {
		update((rounds) => {
			rounds.push({
				tables: [],
				state: RoundState.Empty
			});
			return rounds;
		});
	};

	const remove = (idx: number) => {
		update((rounds) => {
			const roundToBeRemoved = rounds[idx];
			if (roundToBeRemoved.state === RoundState.InProgress) return rounds;
			if (roundToBeRemoved.state === RoundState.Finished) return rounds;

			rounds.splice(idx, 1);
			return rounds;
		});
	};

	const reset = () => {
		set([]);
	};

	return {
		subscribe,
		set,
		update,
		updateRound,
		updateTable,
		add,
		remove,
		reset
	};
}

export const stRounds = createRounds();

if (browser) {
	const storedValue = JSON.parse(window.localStorage?.getItem('rounds') ?? '[]');
	if (storedValue) {
		const parsedVal = schemaRounds.safeParse(storedValue);
		if (parsedVal.success) stRounds.set(parsedVal.data);
	}

	stRounds.subscribe((value) => window.localStorage.setItem('rounds', JSON.stringify(value)));
}
