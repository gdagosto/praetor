export function corsProxy(url: string) {
	return 'https://redirect.rayssinhagamer.workers.dev/?' + encodeURIComponent(url);
}

export function veknUrl(url: string) {
	return corsProxy('https://www.vekn.net/api/' + url);
}
