import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue: boolean = false;

export const stDarkMode = writable<boolean>(defaultValue);

if (browser) {
	const storedValue = JSON.parse(window.localStorage?.getItem('darkMode') ?? 'false');

	if (storedValue && typeof storedValue === 'boolean') {
		stDarkMode.set(storedValue);
	} else {
		window.localStorage?.removeItem('darkMode');
	}

	stDarkMode.subscribe((value) => window.localStorage.setItem('darkMode', JSON.stringify(value)));
}
