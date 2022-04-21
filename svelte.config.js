import path from 'path';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// options passed to svelte.compile (https://svelte.dev/docs#compile-time-svelte-compile)
	kit: {
		adapter: adapter(),
		browser: {
		  hydrate: true,
		  router: true
		},
		vite: {
			resolve: {
				alias: [
					{ find: '$static', 	replacement: path.resolve('static') },
					{ find: '$css', 	replacement: path.resolve('src/css') },
				]
			}
		}
	},

	// Consult https://github.com/sveltejs/svelte-preprocess
	// options passed to svelte.preprocess (https://svelte.dev/docs#compile-time-svelte-preprocess)

	preprocess: [
		preprocess({
			postcss: {
				plugins: [autoprefixer(), tailwindcss()]
			}
		})
	],
};

export default config;