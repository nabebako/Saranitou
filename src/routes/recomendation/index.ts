import crypto from 'crypto';
import { db } from '$static/dummy-data/menu';

/** @type {import('@sveltejs/kit').RequestHandler}*/
export async function get() {
	const recomedation = db.menu[crypto.randomInt(0, db.menu.length)];

	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			...recomedation
		}
	};
}

export async function post({ request }) {
	const body = await request.json();
	const recomedation = db.menu[crypto.randomInt(0, db.menu.length)];

	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			...recomedation
		}
	};
}
