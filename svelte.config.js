import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { getPathes } from './paths.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// options passed to svelte.compile (https://svelte.dev/docs#compile-time-svelte-compile)
	kit: {
		prerender: {
			enabled: true,
			entries: await getPathes(),
			crawl: false,
		},
		adapter: adapter(),
		browser: {
			hydrate: true,
			router: false,
		},
	},


	// Consult https://github.com/sveltejs/svelte-preprocess
	// options passed to svelte.preprocess (https://svelte.dev/docs#compile-time-svelte-preprocess)

	preprocess: [
		preprocess({
			postcss: {
				plugins: [
					autoprefixer(),
					tailwindcss(),
				],
			},
		}),
	],
};

export default config;
