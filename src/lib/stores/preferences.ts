import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { schemaPreferences, type IPreferences } from '$lib/types/preferences';
import { base } from '$app/paths';
import { goto } from '$app/navigation';

const defaultPrefs: IPreferences = {
	darkMode: false,
	lang: 'br'
};

function createPreferences() {
	const initialValue = defaultPrefs;

	const { subscribe, set, update } = writable<IPreferences>(initialValue);

	const partialUpdate = (data: Partial<IPreferences>) => {
		update((prefs) => {
			return {
				...prefs,
				...data
			};
		});
	};

	const changeLanguage = (lang: IPreferences['lang']) => {
		update((prefs) => {
			return { ...prefs, lang };
		});
	};

	const langRoute = (route: string) => {
		return `${base}${route}`;
	};

	const gotoLangRoute = (route: string) => {
		goto(langRoute(route));
	};

	return {
		subscribe,
		set,
		update,
		partialUpdate,
		changeLanguage,
		gotoLangRoute
	};
}

export const stPreferences = createPreferences();

if (browser) {
	const storedValue = JSON.parse(window.localStorage?.getItem('preferences') ?? '{}');
	if (storedValue) {
		const parsedVal = schemaPreferences.safeParse(storedValue);
		if (parsedVal.success) {
			stPreferences.set(parsedVal.data);
		} else {
			window.localStorage?.removeItem('preferences');
		}
	} else {
		window.localStorage?.removeItem('preferences');
	}
}

stPreferences.subscribe((val) => {
	window.localStorage.setItem('preferences', JSON.stringify(val));
});
