import { schemaTourneySettings, type ITourneySettings } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue: ITourneySettings = {
	name: '',
	date: '',
	city: '',
	format: 'constructed',
	level: '',
	rounds: 3
};

function createTourney() {
	const initialValue = defaultValue;

	const { subscribe, set, update } = writable<ITourneySettings>(initialValue);

	const partialUpdate = (data: Partial<ITourneySettings>) => {
		update((prefs) => {
			return {
				...prefs,
				...data
			};
		});
	};

	const updateCol = (col: keyof ITourneySettings, val: string | number | undefined) => {
		update((tourney) => {
			return {
				...tourney,
				[col]: val
			};
		});
	};

	return {
		subscribe,
		set,
		update,
		partialUpdate,
		updateCol
	};
}

export const stTourneySettings = createTourney();

if (browser) {
	const textVal = window.localStorage?.getItem('tourneySettings');
	if (textVal) {
		const parsedVal = schemaTourneySettings.safeParse(JSON.parse(textVal));
		if (parsedVal.success) {
			stTourneySettings.set(parsedVal.data);
		} else {
			window.localStorage?.removeItem('tourneySettings');
		}
	} else {
		window.localStorage?.removeItem('tourneySettings');
	}
}

stTourneySettings.subscribe((val) => {
	window.localStorage.setItem('tourneySettings', JSON.stringify(val));
});
