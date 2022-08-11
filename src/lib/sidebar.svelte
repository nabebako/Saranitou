<script lang="ts">
	import Hamburger from '$lib/animation/hamburger.svelte';

	export let iconSize: number = 24;
	export let shouldShow = false;

	function toggleSidebar() {
		shouldShow = !shouldShow;
	}
</script>

<div class="relative z-20 rounded-full" on:click={toggleSidebar}>
	<Hamburger canvasWidth={iconSize} canvasHeight={iconSize} />
</div>

<div class="sidebar-container bg-white dark:bg-neutral-600 box-shadow-sm" should-show={shouldShow}>
	<div class="px-4 pt-24 md:pt-32 pb-8 grid gap-4">
		<slot name="before" />
		<a class="link" href="/">Recomendation</a>
		<a class="link" href="/save">View saved</a>
		<a class="link" href="/search">Search</a>
		<slot name="after" />
	</div>
</div>

<style lang="postcss">
	.sidebar-container {
		@apply absolute top-0 left-0 z-10;
		height: calc(var(--vh) * 100);
		transform: translateX(-100%);
		@apply overflow-hidden;
		@apply transition-transform duration-100 ease-out;
	}
	.sidebar-container[should-show='true'] {
		transform: translateX(0);
	}
</style>
