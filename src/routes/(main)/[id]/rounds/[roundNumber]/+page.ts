import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	let roundNumber = Number(params.roundNumber);
	if (params.roundNumber === 'finals') roundNumber = 100;

	return {
		roundNumber
	};
};
