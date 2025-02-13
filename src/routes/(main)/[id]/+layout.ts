import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	return {
		id: Number(params.id)
	};
};
