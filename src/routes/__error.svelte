<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async function ({ error, status, fetch }) {
		let items = [];
		await fetch('/api/recomendation?amount=2')
			.then((res) => res.json())
			.then(({ recomendations }: APIRecomendationsResponse) => (items = recomendations));

		return {
			props: {
				items,
				errorMessage: error.message,
				status
			}
		};
	};
</script>

<script lang="ts">
	import DishCard from '$lib/dish-card.svelte';

	import '$css/global.css';
	import IcoError from '../lib/ico/ico-error.svelte';

	export let items: DocumentDish[] = [];
	export let errorMessage: string = '';
	export let status: number = 0;
</script>

<svelte:head>
	<title>Saranitou • Discover and start cooking</title>
</svelte:head>

<main class="overflow-hidden bg-neutral-100 dark:bg-neutral-600">
	<div class="main-container p-main text-center">
		<section class="flex space-x-8 justify-center items-center">
			<div>
				<p class="text-8xl">{status}</p>
				<p class="text-xl">{errorMessage}</p>
			</div>
			<IcoError height={400} width={400} />
		</section>
		<section class="space-y-4 max-w-6xl mx-auto">
			<p class="text-xl font-handwriting">Our recomendations</p>
			<div class="grid grid-cols-2 gap-8">
				{#each items as item}
					<DishCard {item} />
				{/each}
			</div>
		</section>
	</div>
</main>
