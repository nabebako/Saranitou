<script lang="ts">
	import Hamburger from '$lib/animation/hamburger.svelte';

	export let iconSize: number = 24;

	let shouldShow = false;

	function toggleSidebar() {
		shouldShow = !shouldShow;
	}
</script>

<div class="relative z-20 hover:cursor-pointer" on:click={toggleSidebar}>
	<Hamburger canvasWidth={iconSize} canvasHeight={iconSize} />
</div>

<div
	class="sidebar-container absolute top-0 left-0 z-10 bg-neutral-700" should-show={shouldShow}
>
	<div class="px-4 pt-24 md:pt-32 pb-8 grid gap-4 bg-neutral-100 dark:bg-neutral-600">
		<slot name="before" />
		<div>
			<a class="bnt" href="/save">View saved</a>
		</div>
		<div>
			<a class="bnt" href="/option">Options</a>
		</div>
		<slot name="after" />
	</div>
</div>

<style lang="postcss">
	.sidebar-container {
		@apply h-screen;
		@apply overflow-hidden;
		transform: translateX(-100%);
		transition-property: transform;
		transition-duration: 100ms;
		transition-timing-function: ease-out;
	}
	.sidebar-container[should-show='true'] {
		transform: translateX(0);
	}
</style>