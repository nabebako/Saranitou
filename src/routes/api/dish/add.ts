import type { RequestHandler } from '@sveltejs/kit';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 				import.meta.env.VITE_API_KEY as string,
  authDomain: 			import.meta.env.VITE_AUTH_DOMAIN as string,
  projectId: 			import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: 		import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId:	import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  appId: 				import.meta.env.VITE_APP_ID as string,
  measurementId: 		import.meta.env.VITE_MEASUREMENT_ID as string,
};

const firestore = getFirestore(initializeApp(firebaseConfig));

/** @type {import('@sveltejs/kit').RequestHandler}*/
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

		if(!name || !description) throw new Error('no name or description provided');

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
					status: 400,
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