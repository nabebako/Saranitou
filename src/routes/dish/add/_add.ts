import type { RequestHandler } from "@sveltejs/kit";

import { db } from "$static/dummy-data/menu";
import { writeFileSync, mkdirSync, existsSync, openSync, closeSync } from 'fs';
import path from 'path';

/** @type {import('@sveltejs/kit').RequestHandler}*/
export const post: RequestHandler = async function({ request }) {
	try {
		// request.headers.get('auth-token');
		const formData = await request.formData();
		const name = formData.get('dish-name');
		const description = formData.get('dish-description');

		if(!name || !description) throw new Error('no name or description provided');
		
		let id = db.menu.length;
		let dir = `src/routes/dish/${id}`;
		while(existsSync(dir)) {
			id++;
			dir = `src/routes/dish/${id}`;
		}
	
		if (!existsSync(dir)) mkdirSync(dir);
	
		writeFileSync(path.resolve(`${dir}/${name}.svelte`), `<script context='module'>\n\texport const prerendering = true;\n</script>\n<script>\n\timport Dish from "$lib/template/dish.svelte";\n</script>\n<Dish name='${name}' description='${description}'/>`, 'utf-8');
		
		return {
			status: 200,
		};
	} catch {
		return {
			status: 500,
		}
	}

}