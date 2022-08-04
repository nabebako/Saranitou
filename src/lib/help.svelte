<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	let toggleButton: HTMLButtonElement;

	let shouldHelpPersist = false;
	const shouldShowHelp = writable(false);

	function showHelp() {
		shouldShowHelp.set(true);
	}
	function hideHelp() {
		if (!shouldHelpPersist) shouldShowHelp.set(false);
	}
	function togglePersistantHelp() {
		shouldHelpPersist = !shouldHelpPersist;
		if (shouldHelpPersist) {
			shouldShowHelp.set(true);
		} else {
			shouldShowHelp.set(false);
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
		<div
			transition:fade={{ duration: 300, easing: cubicInOut }}
			class="absolute {position} z-50"
		>
			<div class="p-4 rounded-md bg-neutral-700 text-white">
				<slot />
			</div>
		</div>
	{/if}
{:else}
	<button
		class="p-2 rounded-full transition-colors duration-200 hover:bg-neutral-10"
		bind:this={toggleButton}
		on:mouseover={showHelp}
		on:mouseleave={hideHelp}
		on:click={togglePersistantHelp}
		on:focus={showHelp}
		on:blur={hideHelp}
	>
		<div class="w-6 h-6 change-color">
			<p class="text-center text-primary-300 text-xl">?</p>
		</div>
	</button>
{/if}
