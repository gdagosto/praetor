import type { ITourneySettings } from '$lib/types/tourney';
import { writable } from 'svelte/store';

const defaultValue: ITourneySettings = {
	rounds: 3
};

export const stTourneySettings = writable<ITourneySettings>(defaultValue);
