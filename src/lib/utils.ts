import { type ClassValue, clsx } from 'clsx';
import { MediaQuery } from 'svelte/reactivity';
import { twMerge } from 'tailwind-merge';
import { stVeknCredentials } from './stores/vekn';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const isDesktop = new MediaQuery('(min-width: 768px)');

export function corsProxy(url: string) {
	return 'https://redirect.rayssinhagamer.workers.dev/?' + encodeURIComponent(url);
}

function veknUrl(endpoint: string) {
	return corsProxy('https://www.vekn.net/api/vekn/' + endpoint);
}

async function veknFetch(endpoint: string, init: RequestInit) {
	try {
		const res = await fetch(veknUrl(endpoint), init);
		if (res.ok) {
			const json = await res.json();
			if (json.err_code) throw new Error(`[${json.err_code}] ${json.err_msg}`);
			return json.data;
		}

		const errMessage = await res.text();
		throw new Error(`[${res.status}] ${errMessage}`);
	} catch (err) {
		console.error('Fetch error', err);
		if (typeof err === 'string') throw new Error(err);
		if (err instanceof Error) throw err;
	}
}

async function veknLogin() {
	console.debug('VEKN_LOGIN');

	const loginData = new FormData();
	loginData.append('username', stVeknCredentials.current.username);
	loginData.append('password', stVeknCredentials.current.password);

	const data = await veknFetch('login', { method: 'POST', body: loginData });
	stVeknCredentials.current.token = data.auth;
}

export async function veknApi(endpoint: string, init?: RequestInit) {
	console.debug('VEKN_API');
	const headers = new Headers(init?.headers);
	if (!headers.has('Content-Type')) {
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
	}
	if (!headers.has('Authorization')) {
		if (!stVeknCredentials.current.token) await veknLogin();
		headers.append('Authorization', `Bearer ${stVeknCredentials.current.token}`);
	}

	try {
		return veknFetch(endpoint, { ...init, headers });
	} catch (err) {
		await veknLogin();
		return veknFetch(endpoint, { ...init, headers });
	}
}
