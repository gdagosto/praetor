import tailwindcss from '@tailwindcss/vite';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		}),
		tailwindcss()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
});
