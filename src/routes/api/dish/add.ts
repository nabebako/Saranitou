import type { RequestHandler } from '@sveltejs/kit';

import { db } from '$static/dummy-data/menu';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

/** @type {import('@sveltejs/kit').RequestHandler}*/
export const post: RequestHandler = async function ({ request }) {
	if(request.headers.get('Content-Type').search('multipart/form-data') === -1) {
		return {
			status: 400,
			body: {
				errors: 'invalid content type; accepts multipart/form-data',
			},
		}
	}
	try {
		// request.headers.get('auth-token');
		const formData 		= await request.formData();
		const name 			= formData.get('dish-name') as string;
		const description 	= formData.get('description') as string;
		const imageFile 	= formData.get('image-file') as Blob;
		const imageUrl 		= formData.get('image-url') as string;

		let id = db.menu.length;
		let dir = `src/routes/dish/${id}`;

		if(!name || !description) throw new Error('no name or description provided');

		while(existsSync(dir)) {
			id++;
			dir = `src/routes/dish/${id}`;
		}

		if (!existsSync(dir)) mkdirSync(dir);

		writeFileSync(
			path.resolve(`${dir}/${name}.svelte`),
			`<script context='module'>\n\texport const prerendering = true;\n</script>\n<script>\n\timport Dish from "$lib/template/dish.svelte";\n</script>\n<Dish name='${name}' description='${description}'/>`,
			'utf-8'
		);

		if(imageUrl) {
			const imageTest = await fetch(imageUrl);
			if(imageTest.status === 200 && imageTest.headers.get('content-type').match(/image\/.*/) !== null) {
				const imageType = imageTest.headers.get('content-type').match(/(?<=image\/)[a-z]*/i);
				writeFileSync(
					path.resolve(`${dir}/${name}.${imageType}`),
					Buffer.from(await imageTest.arrayBuffer())
				);
			} else {
				return {
					status: 400,
					body: {
						'url-endpoint-status': imageTest.status,
						'error': 'url endpoint error',
					},
				}
			} 
		} else if(imageFile) {
			writeFileSync(
				path.resolve(`${dir}/${name}.${imageFile.type.split('/')[1]}`),
				Buffer.from(await imageFile.arrayBuffer())
			);
		} else {
			return {
				status: 200,
				body: {
					'warn': 'no image',
				},
			};
		}
		return {
			status: 200,
		};
	} catch (error) {
		return {
			status: 500,
			body: { error },
		};
	}
}