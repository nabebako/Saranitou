import type { RequestHandler } from '@sveltejs/kit';
import { firestore } from '$lib/firestore';
import { collection, addDoc, updateDoc } from 'firebase/firestore';

export const post: RequestHandler = async function ({ request }) {
	if(!request.headers.get('Content-Type') || request.headers.get('Content-Type')?.search('multipart/form-data') === -1) {
		return {
			status: 400,
			body: {
				errors: 'invalid content type; accepts multipart/form-data',
			},
		}
	}
	try {
		// request.headers.get('auth-token');
		const formData 		= await request.formData();
		const name 			= formData.get('dish-name') as string;
		const description 	= formData.get('description') as string;
		const imageUrl 		= formData.get('image-url') as string;
		const scriptCheck	= /<script>|<script\/>/;

		if(!name || !description) throw new Error('no name or description provided');

		if(scriptCheck.test(name) || scriptCheck.test(description)) {
			return {
				status: 401,
				body: 'script tag detected; nice try'
			}
		}

		const docRef = await addDoc(collection(firestore, 'suggestions'), {
			name,
			description,
			'create-time': new Date().toDateString(),
			'image-url': null,
			'image-type': '',
		});

		if(imageUrl) {
			const imageTest = await fetch(imageUrl);
			if(imageTest.status === 200 && imageTest.headers.get('content-type').match(/image\/.*/) !== null) {
				const imageType = imageTest.headers.get('content-type').match(/(?<=image\/)[a-z]*/i);
				updateDoc(docRef, {
					'image-url': imageUrl,
					'image-type': imageType,
				});
			} else {
				return {
					status: 200,
					body: {
						'url-endpoint-status': imageTest.status,
						'error': 'url endpoint error',
					},
				}
			} 
		}
		return {
			status: 200,
		};
	} catch (error) {
		return {
			status: 500,
			body: { error },
		};
	}
}