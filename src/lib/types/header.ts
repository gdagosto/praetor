import type { ComponentType, SvelteComponent } from 'svelte';
import type { IButtonHierarchy } from '.';

export interface IHeaderControl {
	tooltip?: string;
	icon?: ComponentType<SvelteComponent>;
	text?: string;
	onClick: () => void;
	hierarchy: IButtonHierarchy;
}
