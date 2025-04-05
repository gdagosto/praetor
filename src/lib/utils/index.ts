import { type ClassValue, clsx } from 'clsx';
import { MediaQuery } from 'svelte/reactivity';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const isDesktop = new MediaQuery('(min-width: 768px)');
