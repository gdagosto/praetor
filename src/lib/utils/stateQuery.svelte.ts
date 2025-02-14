import { liveQuery } from 'dexie';

export function stateQuery<T>(
	initial: T,
	querier: () => T | Promise<T>,
	dependencies?: () => unknown[]
) {
	let query = $state<{ current: T }>({ current: initial });
	$effect.root(() => {
		$effect(() => {
			dependencies?.();
			return liveQuery(querier).subscribe(
				(value) => {
					query.current = value;
				},
				(error) => {
					console.error(error);
				}
			).unsubscribe;
		});
	});
	return query;
}
