import type { RequestHandler } from '@sveltejs/kit';

import { db } from '$static/dummy-data/menu';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

/** @type {import('@sveltejs/kit').RequestHandler}*/
export const post: RequestHandler = async function ({ request }) {
	try {
		if(request.headers.get('Content-Type').search('multipart/form-data') === -1) {
			return {
				status: 400,
				body: {
					errors: 'invalide content type',
				}
			}
		} else {
			// request.headers.get('auth-token');
			const formData = await request.formData();
			const imageFile = formData.get('image-file') as Blob;
			const imageUrl = formData.get('image-url') as string;
			const name = formData.get('dish-name');
			const description = formData.get('description');

			// if(!name || !description) throw new Error('no name or description provided');
			const imageTest = await fetch(imageUrl, {
				redirect: 'manual'
			});
			if(imageTest.status === 200 && imageTest.headers.get('content-type').search('image') !== -1) {
				console.log(Buffer.from(await imageTest.arrayBuffer()));

				let id = db.menu.length;
				let dir = `src/routes/dish/${id}`;
				while(existsSync(dir)) {
					id++;
					dir = `src/routes/dish/${id}`;
				}
	
				if (!existsSync(dir)) mkdirSync(dir);
	
				writeFileSync(path.resolve(`${dir}/${name}.svelte`), `<script context='module'>\n\texport const prerendering = true;\n</script>\n<script>\n\timport Dish from "$lib/template/dish.svelte";\n</script>\n<Dish name='${name}' description='${description}'/>`, 'utf-8');
				
				
				writeFileSync(path.resolve(`${dir}/${name}.${imageFile.type.split('/')[1]}`), Buffer.from(await imageFile.arrayBuffer()));
				return {
					status: 200
				};
			} else {
				return {
					status: 400,
					body: {
						error: 'does not accept redirect url',
					},
				}
			}
		}
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			body: { error },
		};
	}
};
