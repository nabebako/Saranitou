<script>
	import Header from "$lib/header.svelte";
	import Footer from "$lib/footer.svelte";

	import { onMount } from "svelte";

	onMount(() => {
		document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		window.addEventListener('resize', () => {
			document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		});
	});
</script>

<div class="main">
	<Header/>

	<slot></slot>

	<Footer/>
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
