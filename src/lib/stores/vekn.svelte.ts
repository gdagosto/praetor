import { LocalStorage } from '$lib/utils/localStorage.svelte';

export const stVeknCredentials = new LocalStorage('vekn-credentials', {
	username: '',
	password: '',
	token: '',
	isLoggedIn: true
});
