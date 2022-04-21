/** @type {import('@sveltejs/kit').RequestHandler}*/
import { db } from '$static/dummy-data/menu';

export async function post({ request }) {
	const ids: string[] = JSON.parse((await request.json()) ?? []);
	let res = [];
	db.menu.forEach((dish) => {
		if (ids.indexOf(dish.id) !== -1) {
			res.push(dish);
		}
	});

	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			items: res
		}
	};
}
