import type { ComponentType, SvelteComponent } from 'svelte';

export interface INavItem {
	id: string;
	dot?: boolean;
	icon?: ComponentType<SvelteComponent>;
	badge?: string | number;
	text?: string;
	position?: 'main' | 'footer';
	onClick?: () => void;
}
