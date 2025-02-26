import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		roundNumber: Number(params.roundNumber)
	};
};
