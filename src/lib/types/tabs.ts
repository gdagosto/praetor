export interface ITabItem {
	id: string | number;
	text: string;
	onClick: () => void;
}

export type ITabType =
	| 'button-primary'
	| 'button-gray'
	| 'underline'
	| 'underline-filled'
	| 'button-white-border';

export type ITabSize = 'sm' | 'md';
