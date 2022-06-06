<script lang="ts">
	import { onMount } from 'svelte';

	import DishCard from '$lib/dish-card.svelte';
	import Loading from '$lib/animation/loading.svelte';

	import '$css/global.css';

	let items = [];
	let shouldShowLoading = true;

	onMount(() => {
		fetch('/api/database', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: localStorage.getItem('dish-ids') ?? '',
			})
		.then((res) => res.json())
		.then((res) => {
			items = res;
			shouldShowLoading = false;
		})
		.catch();
	});
</script>

<svelte:head>
	<title>Liked Dishes • Saranitou</title>
</svelte:head>

<main>
	<div class="grid main-container p-main min-h-[calc(var(--vh)*80)] font-handwriting">
		<p class="text-center text-2xl">Saved list</p>
		{#if shouldShowLoading}
		<div class="grid w-full h-full center-contents">
			<Loading/>
		</div>
		{:else}
		<div class="mt-16 h-full">
			{#if items.length !== 0}
			<div class="media-card-container">
				{#each items as item}
				<DishCard {item} />
				{/each}
			</div>
			{:else}
			<p class="pb-8 text-center text-xl">You have no dish saved; find some and come back later.</p>
			<p class="pb-4 text-center text-xl">Start discovering some here:</p>
			<div class="grid w-fit mx-auto grid-cols-2 gap-12 place-items-center">
				<a class="link" href="/">Get a recomendation</a>
				<a class="link" href="/search">Search for them</a>
			</div>
			{/if}
		</div>
		{/if}
	</div>
</main>

<style lang="postcss">
	.main-container {
		grid-template-rows: auto 1fr;
	}

	.media-card-container {
		@apply grid gap-4;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(auto-fill, 1fr);
	}
	@media screen(lg) {
		.media-card-container {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
