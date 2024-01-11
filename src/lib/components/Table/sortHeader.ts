import type { ITableSortHeader } from '$lib/types';
import { writable } from 'svelte/store';

export function createSortHeader() {
	const { subscribe, set, update } = writable<ITableSortHeader>({
		id: '',
		direction: 0
	});

	return {
		subscribe,
		set,
		update,
		change: (id: string) =>
			update((header) => {
				console.log('change', id, header);
				if (header.id !== id) {
					return { id, direction: 1 };
				}
				if (header.direction === 1) {
					header.direction = -1;
				} else {
					header.direction += 1;
				}

				return header;
			})
	};
}
