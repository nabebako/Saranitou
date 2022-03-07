/** @type {import('@sveltejs/kit').RequestHandler}*/
import * as db from '../../../static/dummy-data/menu.json';
import crypto from 'crypto';

export async function post({ request }) {
	const body = await request.json();
	const recomedation = db.menu[crypto.randomInt(0, db.menu.length)];
	
	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			...recomedation,
			'img': 'favicon.jpg'
		}
	};
}
