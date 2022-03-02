import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess

	preprocess: [
		preprocess({
			postcss: { plugins: [autoprefixer(), tailwindcss()] }
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
