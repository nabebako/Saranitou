<script>
	import { onMount } from 'svelte';
	import DishCard from '$lib/dish-card.svelte';

	let items = [];

	onMount(() => {
		fetch('/api/database', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: localStorage.getItem('dish-ids') ?? '',
			})
		.then((res) => res.json())
		.then((res) => items = res)
		.catch();
	});
</script>

<div>
	<h1 class="text-center">Saved list</h1>
	<div class="media-card-container">
		{#each items as item}
			<DishCard {item} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.media-card-container {
		@apply grid gap-4;
		grid-template-columns: repeat(3, 1fr);
	}
</style>
