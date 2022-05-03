import type { RequestHandler } from '@sveltejs/kit';
import { firestore } from '$lib/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const post: RequestHandler = async function ({ request }) {
	let ids = await request.json() as Array<string>;
	ids = ids.filter((val) => !!val);
	if(!ids) {
		return {
			status: 401,
		}
	}
	let items = [];

	(await getDocs(query(collection(firestore, 'dishes'), where('id', 'in', ids)))).forEach((doc) => {
		items = [...items, doc.data()];
	});
	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: items,
	};
}