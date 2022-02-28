import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	
	preprocess: [preprocess({
		postcss: { plugins: [autoprefixer()] },
		defaults: { script: 'typescript', style: 'postcss' }
	})],

	kit: {
		adapter: adapter(),
	}
};

export default config;