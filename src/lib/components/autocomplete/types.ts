import type { DialogTriggerProps } from 'bits-ui';
import type { Snippet } from 'svelte';

export type IPropsAutocomplete = DialogTriggerProps & {
	children: Snippet;
	nested?: boolean;
	autoOpen?: boolean;
	placeholder?: string;
	baseClass?: string;
	onsuccess?: (id: number) => void;
	open?: boolean;
};
