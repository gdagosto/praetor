import type { ComponentType, SvelteComponent } from 'svelte';

export type IButtonHierarchy =
	| 'primary'
	| 'secondary-gray'
	| 'secondary-color'
	| 'tertiary-gray'
	| 'tertiary-color'
	| 'link-gray'
	| 'link-color'
	| 'primary-destructive'
	| 'secondary-destructive'
	| 'tertiary-destructive'
	| 'link-destructive';

export type IButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IButtonGroupItem {
	text?: string;
	icon?: ComponentType<SvelteComponent> | 'dot';
	value?: string | number | symbol;
	disabled?: boolean;
}
