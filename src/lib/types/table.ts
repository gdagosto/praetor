import type { SvelteComponent, ComponentType } from 'svelte';
import type { IButtonHierarchy } from '.';
import type { createSortHeader } from '../components/Table/sortHeader.js';

export type ITableRow = Record<string, string | number | symbol>;

export interface ITableHeader {
	id: string;
	text: string;
	sortable?: boolean;
}

export interface ITableSortHeader {
	id: string;
	direction: number;
}
export interface ITableTitle {
	text: string;
	badge?: string;
	description?: string;
	controls: ITableHeaderControl[];
}

export interface ITableHeaderControl {
	tooltip?: string;
	icon?: ComponentType<SvelteComponent>;
	text?: string;
	onClick: (rows: ITableRow[]) => void;
	hierarchy: IButtonHierarchy;
}

export interface ITableControl {
	tooltip?: string;
	icon: ComponentType<SvelteComponent>;
	onClick: (row: ITableRow, idx: number) => void;
}

export interface ITableOptions {
	title: ITableTitle;
	controls?: ITableControl[];
}

export interface ITableContext {
	sortHeader: ReturnType<typeof createSortHeader>;
}
