import type { RequestHandler } from '@sveltejs/kit';
import { firestore } from '$lib/firestore';
import { collection, query, where, getDoc, doc, getDocs, limit } from 'firebase/firestore';

export const get: RequestHandler = async function ({ url }) {
	const count = (await getDoc(doc(firestore, 'dishes/counter'))).get('count') as number;
	const wantedId = (Math.floor(Math.random() * count) + 1).toString();
	const snapshot = await getDocs(query(collection(firestore, 'dishes'), where('id', '==', wantedId), limit(1)));
	const recomedation = snapshot.docs[0].data();

	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			recomedation
		}
	};
}