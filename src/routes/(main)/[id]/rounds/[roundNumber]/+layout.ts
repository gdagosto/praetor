import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	let roundNumber = Number(params.roundNumber);
	if (params.roundNumber === 'finals') roundNumber = 100;

	return {
		roundNumber
	};
};
