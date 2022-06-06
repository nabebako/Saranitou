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

<style lang="postcss">
	:global(.main) {
		@apply grid min-h-fit;
		grid-template-rows: auto 1fr auto;
		min-height: 100vh;
		min-height: calc(var(--vh, 1vh) * 100);
		width: 100vw;
	}
</style>