import { LocalStorage } from '$lib/utils/localStorage.svelte';

export const stLocal = new LocalStorage('local', {
	tournamentId: 0
});
