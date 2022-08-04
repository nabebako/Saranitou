<script>
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';

	import { onMount } from 'svelte';

	onMount(() => {
		document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		window.addEventListener('resize', () => {
			document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		});
	});
</script>

<div class="main">
	<Header />

	<div class="bg-neutral-100 dark:bg-neutral-600 w-[80vw] mx-auto px-8 my-16">
		<slot />
	</div>

	<Footer />
</div>

<style lang="postcss">
	:global(.main) {
		@apply grid min-h-fit;
		grid-template-rows: auto 1fr auto;
		min-height: 100vh;
		min-height: calc(var(--vh, 1vh) * 100);
		width: 100%;
	}
</style>
