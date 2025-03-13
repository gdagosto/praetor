import type { LayoutLoad } from './$types';
export const prerender = false; // route cannot be prerendered due to id parameter

export const load: LayoutLoad = ({ params }) => {
	return {
		id: Number(params.id)
	};
};
