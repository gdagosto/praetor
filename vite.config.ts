import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { paraglide } from '@inlang/paraglide-js-adapter-sveltekit/vite';
import path from 'path';

const PACKAGE_ROOT = __dirname;

export default defineConfig({
	resolve: {
		alias: {
			$lib: path.resolve(PACKAGE_ROOT, 'src', 'lib'),
			$paraglide: path.resolve(PACKAGE_ROOT, 'src', 'paraglide')
		},
		preserveSymlinks: true
	},
	plugins: [
		paraglide({
			project: './project.inlang',
			outdir: './src/paraglide'
		}),

		sveltekit()
	]
});
