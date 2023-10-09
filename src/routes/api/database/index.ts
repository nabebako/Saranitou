import type { RequestHandler } from '@sveltejs/kit';
import { firestore } from '$lib/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const GET: RequestHandler = async function ({ request }) {
	if (!request.headers.has('dish')) {
		return {
			status: 400,
			body: 'no dish header',
		};
	}

	try {
		const ids = request.headers.get('dish').split(',').filter((val) => !!val);

		if (!ids) {
			return {
				status: 200,
				body: {},
			};
		}

		let items = [];
		const docs = await getDocs(query(collection(firestore, 'dishes'), where('id', 'in', ids)));
		docs.forEach((doc) => items = [...items, doc.data()]);
		return {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			body: items,
		};
	} catch {
		return {
			status: 400,
			body: 'json structure not acceptable, only accepts array',
		};
	}
};
