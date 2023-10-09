<script lang="ts">
	import '$css/global.css';
	import { onMount } from 'svelte';

	onMount(() => {
		fetch('/api/recomendation')
			.then(async (res) => {
				if (res.status !== 200) throw new Error(await res.text());
				return res.json();
			})
			.then((body: APIRecomendationsResponse) => {
				if (body.recomendations[0]) {
					const dish = body.recomendations[0];
					window.location.replace(`/dish/${dish.id}/${dish.urlName}`);
				}
			})
			.catch((err) => {});
	})
</script>

<svelte:head>
	<title>Saranitou • Discover and start cooking</title>
</svelte:head>

<main class="relative h-full bg-neutral-100 dark:bg-neutral-600">
</main>
