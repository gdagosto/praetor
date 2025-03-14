import { LocalStorage } from '$lib/utils/localStorage.svelte';

export const stVeknCredentialsInitialValue = {
	username: '',
	password: '',
	id: 0,
	avatarId: 0,
	token: '',
	isLoggedIn: true
};

export const stVeknCredentials = new LocalStorage(
	'vekn-credentials',
	structuredClone(stVeknCredentialsInitialValue)
);
