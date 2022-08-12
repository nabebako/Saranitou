import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// options passed to svelte.compile (https://svelte.dev/docs#compile-time-svelte-compile)
	kit: {
		prerender: {
			enabled: true,
			entries: ['/dish/1'],
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
