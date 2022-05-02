import type { RequestHandler } from '@sveltejs/kit';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDoc, doc, getDocs, limit } from 'firebase/firestore';

const firestore = getFirestore(initializeApp({
	apiKey: 			import.meta.env.VITE_API_KEY as string,
	authDomain: 		import.meta.env.VITE_AUTH_DOMAIN as string,
	projectId: 			import.meta.env.VITE_PROJECT_ID as string,
	storageBucket: 		import.meta.env.VITE_STORAGE_BUCKET as string,
	messagingSenderId:	import.meta.env.VITE_MESSAGING_SENDER_ID as string,
	appId: 				import.meta.env.VITE_APP_ID as string,
	measurementId: 		import.meta.env.VITE_MEASUREMENT_ID as string,
}));

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