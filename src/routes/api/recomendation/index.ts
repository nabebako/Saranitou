import type { RequestHandler } from '@sveltejs/kit';
import { firestore } from '$lib/firestore';
import { collection, query, where, getDoc, doc, getDocs, limit } from 'firebase/firestore';

export const GET: RequestHandler = async function ({ url }) {

	const amount = parseInt(url.searchParams.get('amount')) || 1;
	const excludes = url.searchParams.get('excludes')?.split(/\s*,\s*/).filter((val, i, arr) => arr.indexOf(val) === i) ?? [];

	let ids: string[] = [];

	try {
		const count = (await getDoc(doc(firestore, 'counter/dish'))).get('count') as number;
		const countAvailable = count - excludes.length;

		if (countAvailable < 1) {
			return {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					amount: 0,
					amountAvailable: countAvailable,
					excludes,
					recomendations: [],
				},
			};
		}

		for (let i = 0; ids.length < amount && ids.length < countAvailable && i < count; i++) {
			const id = (Math.floor(Math.random() * count) + 1).toString();
			if (excludes.indexOf(id) === -1) {
				ids = ids.concat(id);
			}
		}

		const recomendations = await Promise.all(ids.map(async (id) => {
			return getDocs(
				query(
					collection(firestore, 'dishes'),
					where('id', '==', id),
					limit(1),
				)
			)
				.then((snapshot) => snapshot.docs[0].data());
		}));

		return {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				amount: recomendations.length,
				amountAvailable: countAvailable,
				excludes,
				recomendations,
			},
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				'error': err,
			},
		};
	}
};
