<script lang="ts">
	import { onMount } from 'svelte';

	import DishCard from '$lib/dish-card.svelte';
	import Loading from '$lib/animation/loading.svelte';

	import '$css/global.css';

	let items = [];
	let shouldShowLoading = true;

	onMount(() => {
		const dishs = localStorage.getItem('dish-ids');
		if (dishs) {
			fetch('/api/database', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: dishs
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

<main>
	<p class="text-center text-2xl font-handwriting">Saved list</p>
	{#if shouldShowLoading}
		<div class="grid w-full h-full center-contents">
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
