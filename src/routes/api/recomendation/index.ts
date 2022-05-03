import type { RequestHandler } from '@sveltejs/kit';
import { firestore } from '$lib/firestore';
import { getFirestore, collection, query, where, getDoc, doc, getDocs, limit } from 'firebase/firestore';

export const get: RequestHandler = async function () {
	const count = (await getDoc(doc(firestore, 'dishes/counter'))).get('count') as number;
	const wantedId = (Math.floor(Math.random() * count) + 1).toString();
	const snapshots = await getDocs(query(collection(firestore, 'dishes'), where('id', '==', wantedId), limit(1)));
	let recomedation = {};
	snapshots.forEach((doc) => recomedation = doc.data());

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

// export const post: RequestHandler = async function ({ request }) {
// 	const body = await request.json();
// 	const recomedation = db.menu[crypto.randomInt(0, db.menu.length)];

// 	return {
// 		status: 200,
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: {
// 			...recomedation
// 		}
// 	};
// }