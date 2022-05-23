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

		let props = snapshot.docs[0].data();

		if(!props) {
			return {
				status: 404,
			};
		} else {
			return {
				status: 200,
				body: {
					'dish': props,
				},
			};
		}
	} catch(err) {
		return {
			status: 500,
		};
	}
}