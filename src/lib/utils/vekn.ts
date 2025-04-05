import { stVeknCredentials } from '$lib/stores/vekn.svelte';
import { ForbiddenError, HttpError } from '$lib/error/http';
import { toast } from 'svelte-sonner';
import { tick } from 'svelte';

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
			if (json.err_code) {
				if (json.err_code === 403) throw new ForbiddenError(json.err_msg);
				throw new HttpError(json.err_msg, json.err_code);
			}
			return json.data;
		}

		const errMessage = await res.text();
		if (res.status === 403) throw new ForbiddenError(errMessage);
		throw new HttpError(errMessage, res.status);
	} catch (err) {
		if (typeof err === 'string') throw new Error(err);
		if (err instanceof Error) throw err;
	}
}

export async function veknLogin() {
	console.debug('VEKN_LOGIN');

	const loginData = new FormData();
	loginData.append('username', stVeknCredentials.current.username);
	loginData.append('password', stVeknCredentials.current.password);

	try {
		const data = await veknFetch('login', { method: 'POST', body: loginData });
		stVeknCredentials.current.token = data.auth;
		stVeknCredentials.current.isLoggedIn = true;
		stVeknCredentials.current.id = data.id;
		stVeknCredentials.current.avatarId = data.id;
	} catch (err) {
		console.error(err);
		if (err instanceof ForbiddenError) {
			stVeknCredentials.current.isLoggedIn = false;
			toast.error('Usuário ou senha incorretos.');
		} else {
			toast.error(`Erro desconhecido., ${err}`);
		}
	}
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
