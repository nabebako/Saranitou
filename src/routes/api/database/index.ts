import type { RequestHandler } from '@sveltejs/kit';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const firestore = getFirestore(initializeApp({
	apiKey: 			import.meta.env.VITE_API_KEY as string,
	authDomain: 		import.meta.env.VITE_AUTH_DOMAIN as string,
	projectId: 			import.meta.env.VITE_PROJECT_ID as string,
	storageBucket: 		import.meta.env.VITE_STORAGE_BUCKET as string,
	messagingSenderId:	import.meta.env.VITE_MESSAGING_SENDER_ID as string,
	appId: 				import.meta.env.VITE_APP_ID as string,
	measurementId: 		import.meta.env.VITE_MEASUREMENT_ID as string,
}));

export const post: RequestHandler = async function ({ request }) {
	const ids: string[] = await request.json() ?? [];
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