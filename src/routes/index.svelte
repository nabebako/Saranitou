<script lang="ts">
	import Recomendation from '$lib/recomendation.svelte';

	import '$css/global.css';
</script>

<svelte:head>
	<title>Saranitou • Discover and start cooking</title>
</svelte:head>

<main class="overflow-hidden bg-neutral-100 dark:bg-neutral-600">
	<div class="relative h-full">
		<div class="py-8">
			<Recomendation />
		</div>
	</div>
</main>
