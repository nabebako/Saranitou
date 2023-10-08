<script lang="ts">
	import { onMount } from 'svelte';

	import DishCard from '$lib/dish-card.svelte';
	import Loading from '$lib/animation/loading.svelte';

	import '$css/global.css';

	let items = [];
	let shouldShowLoading = true;

	onMount(() => {
		const dishs = JSON.parse(localStorage.getItem('dish-ids')) as string[];
		const dishHeaderString = dishs.reduce((str, val) => {
			str = val + ',' + str;
			return str;
		}, '').slice(0, -1);

		const url = '/api/database';
		if (dishs) {
			fetch(url, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					'dish': dishHeaderString
				}
			})
				.then((res) => res.json())
				.then((res) => {
					items = res;
					shouldShowLoading = false;
				})
				.catch();
		} else {
			shouldShowLoading = false;
		}
	});
</script>

<svelte:head>
	<title>Liked Dishes • Saranitou</title>
</svelte:head>

<main class="relative min-h-full">
	<p class="text-center text-2xl font-handwriting">Saved list</p>
	{#if shouldShowLoading}
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<Loading />
		</div>
	{:else}
		<div class="mt-16">
			{#if items.length !== 0}
				<div class="card-grid">
					{#each items as item}
						<DishCard {item} />
					{/each}
				</div>
			{:else}
				<p class="pb-8 text-center text-xl">
					You have no dish saved; find some and come back later.
				</p>
				<p class="pb-4 text-center text-xl">Start discovering some here:</p>
				<div class="grid w-fit mx-auto grid-cols-2 gap-12 place-items-center">
					<a class="link" href="/">Get a recomendation</a>
					<a class="link" href="/search">Search for them</a>
				</div>
			{/if}
		</div>
	{/if}
</main>
