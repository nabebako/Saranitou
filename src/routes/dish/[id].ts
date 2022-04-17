import type { EndpointOutput } from "@sveltejs/kit";
import * as db from '../../../static/dummy-data/menu.json';

/** @type {import('@sveltejs/kit').RequestHandler} */

export async function get({ params }): Promise<EndpointOutput> {
	let res: any;

	db.menu.forEach((dish) => {
		if(dish.id === params.id) {
			res = dish;
		}
	});
	
	return {
		headers: {
			'Content-Type': 'application/json'
		},
		body: { dish: res }
  };
}