import type { RequestHandler } from '@sveltejs/kit';
import { firestore } from '$lib/firestore';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

export const get: RequestHandler = async function ({ params }) {
	try {
		const snapshot = await getDocs(
			query(
				collection(firestore, 'dishes'),
				where('id', '==', params.id),
				where('urlName', '==', params.name),
				limit(1),
			)
		);

		let props = {};
		snapshot.forEach((doc) => {
			props = doc.data();
		});

		if(props) throw new Error('404');

		return {
			status: 200,
			body: props,
		};
	} catch(err) {
		return {
			status: 404,
		};
	}
}