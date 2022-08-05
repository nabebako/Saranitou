<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	import { firestore } from '$lib/firestore';
	import { collection, getDocs } from 'firebase/firestore';

	export const load: Load = async ({ url }) => {
		let results: DocumentDish[] = [];
		const hasQ = url.searchParams.has('q');
		const query = url.searchParams.get('q')?.replace(/<.*?>|<\/.*?>|\*|^\s*$/g, '');

		if (query) {
			const docs = await getDocs(collection(firestore, 'dishes'));

			docs.forEach((doc) => {
				const data = doc.data() as DocumentDish;
				if (
					Object.values(data.name).some(
						(val) =>
							val
								.toLowerCase()
								.replace(' ', '')
								.search(query.toLowerCase().replace(' ', '')) != -1
					)
				) {
					results = [...results, data];
				}
			});
		}
		return {
			props: {
				results,
				query,
				hasQ
			}
		};
	};
</script>

<script lang="ts">
	import DishCard from '$lib/dish-card.svelte';
	import SearchBar from '../lib/search-bar.svelte';

	export let results: DocumentDish[] = [];
	export let query = '';
	export let hasQ = false;
</script>

<svelte:head>
	{#if hasQ}
		<title>{query} • Saranitou</title>
	{:else}
		<title>Search • Saranitou</title>
	{/if}
</svelte:head>

<main>
	<div class="mx-auto w-fit mb-16">
		<SearchBar {query} />
	</div>
	{#if results.length > 0}
		<div class="card-grid">
			{#each results as item}
				<DishCard {item} />
			{/each}
		</div>
	{:else}
		<div class="text-center font-handwriting text-xl">
			{#if query}
				<p>No result for {query}</p>
			{:else}
				<p>Try searching for something.</p>
			{/if}
		</div>
	{/if}
</main>
