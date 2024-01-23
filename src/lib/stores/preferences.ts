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

function detectUserPreferences() {
	// Detect user preferred color scheme
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const languages = navigator.languages || [navigator.language];
	let preferredLang: IPreferences['lang'] = 'en';

	for (let i = 0, iMax = languages.length; i < iMax; i++) {
		const langMain = languages[i].slice(0, 2);
		if (langMain === 'pt') {
			preferredLang = 'br';
			break;
		}

		if (langMain === 'en') {
			preferredLang = 'en';
			break;
		}
	}

	stPreferences.partialUpdate({ darkMode: prefersDark, lang: preferredLang });
}

if (browser) {
	const textVal = window.localStorage?.getItem('preferences');
	if (textVal) {
		const parsedVal = schemaPreferences.safeParse(JSON.parse(textVal));
		if (parsedVal.success) {
			stPreferences.set(parsedVal.data);
		} else {
			window.localStorage?.removeItem('preferences');
		}
	} else {
		window.localStorage?.removeItem('preferences');
		detectUserPreferences();
	}
}

stPreferences.subscribe((val) => {
	window.localStorage.setItem('preferences', JSON.stringify(val));
});
