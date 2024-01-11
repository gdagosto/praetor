import { writable } from 'svelte/store';

const defaultValue: string = '';

export const stCurrentPage = writable<string>(defaultValue);
