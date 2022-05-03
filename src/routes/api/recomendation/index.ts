import type { RequestHandler } from '@sveltejs/kit';
import { firestore } from '$lib/firestore';
import { collection, query, where, getDoc, doc, getDocs, limit } from 'firebase/firestore';

export const get: RequestHandler = async function ({ url }) {
	const count = (await getDoc(doc(firestore, 'dishes/counter'))).get('count') as number;

	const amount = parseInt(url.searchParams.get('amount')) || 1;
	let ids = [] as Array<string>;
	for(let i = 0; i < amount; i++) {
		ids = [...ids, (Math.floor(Math.random() * count) + 1).toString()];
	}
	if(ids.length < 1) {
		return {
			status: 400,
			body: 'invalid amount',
		}
	}

	const snapshot = await getDocs(query(collection(firestore, 'dishes'), where('id', 'in', ids), limit(amount)));
	let recomendation = [];
	snapshot.forEach((doc) => recomendation = [...recomendation, doc.data()]);
	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: { recomendation }
	};
}