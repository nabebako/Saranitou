<script lang="ts" context='module'>
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async function ({ fetch }) {
		let items = {};
		await fetch('/api/recomendation?amount=2')
			.then((res) => res.json())
			.then(({recomendation}) => items = recomendation);

		return {
			props: { items },
		};
	}
</script>

<script lang="ts">
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import Theme from '$lib/theme.svelte';
	import Logo from '$lib/logo.svelte';
	import DishCard from '$lib/dish-card.svelte';

	import '$css/layout.css';
	import '$css/theme.css';

	export let items: Array<{}>;
</script>

<svelte:head>
	<title>Saranitou • Discover and start cooking</title>
</svelte:head>

<Header>
	<div class="w-10 flex items-center justify-center" slot="left">
		<Sidebar iconSize={24}>
			<svelte:fragment slot="before">
				<div class="sm:hidden">
					<Theme />
				</div>
				<a class="bnt" href="/">Recomendation</a>
			</svelte:fragment>
		</Sidebar>
	</div>
	<svelte:fragment slot="center">
		<Logo />
	</svelte:fragment>

	<div class="flex space-x-2" slot="right">
		<div class="hidden sm:inline">
			<Theme />
		</div>
	</div>
</Header>

<main class="overflow-hidden bg-neutral-100 dark:bg-neutral-600">
	<div class="main-container text-center">
		<section class="flex space-x-8 justify-center items-center">
			<div>
				<p class="text-8xl">404</p>
				<p class="text-xl">Page not found</p>
			</div>
			<img class="pointer-events-none" width="400" src="/error.svg" alt="">
		</section>
		<section class="space-y-4 max-w-6xl mx-auto">
			<p class="text-xl">Our recomendation</p>
			<div class="grid grid-cols-2 gap-8">
				{#each items as item}
				<DishCard {item}/>
				{/each}
			</div>
		</section>
	</div>
</main>

<Footer />