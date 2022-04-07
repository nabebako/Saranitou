<script lang="ts" context="module">
	let elements = new Set<HTMLElement>();
	let shouldHelpPersist = false;

	function showHelp() {
		elements.forEach((element) => element.classList.remove('opacity-0'));
	}
	function hideHelp() {
		if(!shouldHelpPersist) {
			elements.forEach((element) => element.classList.add('opacity-0'));
		}
	}
	function toggleHelp() {
		shouldHelpPersist = !shouldHelpPersist;
		if(shouldHelpPersist) {
			elements.forEach((element) => element.classList.remove('opacity-0'));
		} else {
			elements.forEach((element) => element.classList.add('opacity-0'));
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	let advice: HTMLElement;

	onMount(() => {
		if(advice) {
			elements.add(advice);
			return () => elements.delete(advice);
		}
	});
</script>

{#if $$slots.default}
	<div class="opacity-0 p-4 rounded-md bg-neutral-700 text-white transition-opacity duration-300" bind:this={advice}>
		<slot />
	</div>
{:else}
	<div class="rounded-full p-2 hover:cursor-pointer bg-primary-300 hover:bg-primary-200 transition-colors duration-200" on:mouseover={showHelp} on:mouseleave="{hideHelp}" on:click={toggleHelp} on:focus>
		<div class="w-6 h-6 change-color">
			<p class="text-center">?</p>
		</div>
	</div>
{/if}

<style lang="postcss">
	.change-color * {
		@apply text-neutral-100 dark:text-neutral-700;
		@apply fill-neutral-100 dark:fill-neutral-700 ;
		@apply stroke-neutral-100 dark:stroke-neutral-700;
	}
</style>