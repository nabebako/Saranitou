<script lang="ts">
	import { onMount } from 'svelte';

	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import Help from '$lib/help.svelte';
	import Theme from '$lib/theme.svelte';
	import Logo from '$lib/logo.svelte';
	import DishCard from '$lib/dish-card.svelte';

	import '$css/global.css';

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

<svelte:head>
	<title>Liked Dishes • Saranitou</title>
</svelte:head>

<body>
	<Header>
		<div slot="left">
			<Sidebar>
				<a class="bnt" slot="before" href="/">Recomendation</a>
			</Sidebar>
		</div>
		<svelte:fragment slot="center">
			<Logo/>
		</svelte:fragment>
		<div class="flex space-x-2" slot="right">
			<Theme />
			<Help />
		</div>
	</Header>
	<main>
		<div class="main-container">
			<h1 class="text-center text-2xl">Saved list</h1>
			<div class="media-card-container mt-16">
				{#each items as item}
					<DishCard {item} />
				{/each}
			</div>
		</div>
	</main>
	<Footer />
</body>

<style lang="postcss">
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
