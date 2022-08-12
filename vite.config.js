import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
export default {
	plugins: [sveltekit()],

	// config options
	resolve: {
		alias: [
			{ find: '$static', replacement: path.resolve('static') },
			{ find: '$css', replacement: path.resolve('src/css') },
		],
	},
};




