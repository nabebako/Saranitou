import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { loadEnv } from 'vite';

export async function getPathes() {
	const env = loadEnv('build', process.cwd());

	const firestore = getFirestore(initializeApp({
		apiKey: env.VITE_API_KEY,
		authDomain: env.VITE_AUTH_DOMAIN,
		projectId: env.VITE_PROJECT_ID,
		storageBucket: env.VITE_STORAGE_BUCKET,
		messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
		appId: env.VITE_APP_ID,
		measurementId: env.VITE_MEASUREMENT_ID,
	}));

	const snapshots = await getDocs(collection(firestore, 'dishes'));
	let paths = [];
	snapshots.docs.forEach((doc) => {
		paths = [...paths, '/dish/' + doc.data().id + '/' + doc.data().urlName];
	});

	return paths;
}
