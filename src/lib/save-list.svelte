<script>
	import { onMount } from 'svelte';
	import DishCard from './dish-card.svelte';

	let items = [];

	onMount(async () => {
		items = (
			await fetch('/db', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(localStorage.getItem('dish-ids') ?? '')
			}).then((res) => res.json())
		).items;
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
