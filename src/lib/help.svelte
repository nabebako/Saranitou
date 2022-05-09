<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	let toggleButton: HTMLButtonElement;

	let shouldHelpPersist = false;
	let isMouseOnHelp = false;
	const shouldShowHelp = writable(false);

	function showHelp() {
		isMouseOnHelp = true;
		shouldShowHelp.set(true);
	}
	function hideHelp() {
		isMouseOnHelp = false;
		if (!shouldHelpPersist) shouldShowHelp.set(false);
	}
	function togglePersistantHelp() {
		shouldHelpPersist = !shouldHelpPersist;
		if (shouldHelpPersist) {
			shouldShowHelp.set(true);
		} else {
			if (!isMouseOnHelp) shouldShowHelp.set(false);
			toggleButton.blur();
		}
	}
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let position = '';
</script>

{#if $$slots.default}
	{#if $shouldShowHelp}
		<div transition:fade={{ duration: 300, easing: cubicInOut }} class="absolute {position} z-50">
			<div class="p-4 rounded-md bg-neutral-700 text-white">
				<slot />
			</div>
		</div>
	{/if}
{:else}
	<button
		class="p-2 rounded-full bg-primary-300 hover:bg-primary-200 transition-colors duration-200"
		bind:this={toggleButton}
		on:mouseover={showHelp}
		on:mouseleave={hideHelp}
		on:click={togglePersistantHelp}
		on:focus={showHelp}
		on:blur={hideHelp}
	>
		<div class="w-6 h-6 change-color">
			<p class="text-center">?</p>
		</div>
	</button>
{/if}

<style lang="postcss">
	.change-color * {
		@apply text-neutral-100 dark:text-neutral-700;
		@apply fill-neutral-100 dark:fill-neutral-700;
		@apply stroke-neutral-100 dark:stroke-neutral-700;
	}
</style>
