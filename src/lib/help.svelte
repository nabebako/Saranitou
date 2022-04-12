<script lang="ts" context="module">

	let elements = new Set<HTMLDivElement>();
	let shouldHelpPersist = false;

	function showHelp() {
		elements.forEach((element) => {
			element.classList.remove('hide-help');
			element.classList.add('show-help')
		});
	}
	function hideHelp() {
		if(!shouldHelpPersist) {
			elements.forEach((element) => {
				element.classList.add('hide-help');
				element.classList.remove('show-help');
			});
		}
	}
	function toggleHelp() {
		shouldHelpPersist = !shouldHelpPersist;
		if(shouldHelpPersist) {
			elements.forEach((element) => {
				element.classList.remove('hide-help');
				element.classList.add('show-help');
			});
		} else {
			elements.forEach((element) => {
				element.classList.add('hide-help');
				element.classList.remove('show-help');
			});
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	export let position = '';

	let advice: HTMLDivElement;

	onMount(() => {
		if(advice) {
			elements.add(advice);
			return () => elements.delete(advice);
		}
	});
</script>

{#if $$slots.default}
	<div class="absolute {position} hide-help duration-300 transition-opacity" bind:this={advice}>
		<div class="p-4 rounded-md bg-neutral-700 text-white">
			<slot />
		</div>
	</div>
{:else}
	<div class="rounded-full p-2 hover:cursor-pointer bg-primary-300 hover:bg-primary-200 transition-colors duration-200" on:mouseover={showHelp} on:mouseleave="{hideHelp}" on:click={toggleHelp} on:focus>
		<div class="w-6 h-6 change-color">
			<p class="text-center">?</p>
		</div>
	</div>
{/if}

<style lang="postcss">
	.hide-help {
		@apply -z-10 opacity-0;
	}
	.show-help {
		@apply z-50 opacity-100;
	}

	.change-color * {
		@apply text-neutral-100 dark:text-neutral-700;
		@apply fill-neutral-100 dark:fill-neutral-700 ;
		@apply stroke-neutral-100 dark:stroke-neutral-700;
	}
</style>