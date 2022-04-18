<script lang="ts">
	import Hamburger from './animation/hamburger.svelte';

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
	class="absolute top-0 left-0 z-10 overflow-hidden h-screen transition-width bg-neutral-700
	{shouldShow ? 'max-w-screen' : 'max-w-0'}"
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
