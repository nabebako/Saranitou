<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	import IcoRefresh from './ico/ico-refresh.svelte';
	import IcoSave from './ico/ico-save.svelte';
	import IcoSkip from './ico/ico-skip.svelte';
	import IcoSymlink from './ico/ico-link.svelte';

	export let refresh: () => void;
	export let save: () => void;
	export let skip: () => void;

	export let dish: DocumentDish;
	export let shouldShowLoading: boolean;
</script>

<div class="cmd-bar box-shadow-sm">
	<div class="flex space-x-2">
		<button class="bar-element" on:click={refresh}>
			<IcoRefresh />
		</button>
		{#if !shouldShowLoading}
			<button
				class="bar-element"
				on:click={save}
				transition:fade={{ duration: 200, easing: cubicOut }}
			>
				<IcoSave classCss="save-icon" />
			</button>
			<button
				class="bar-element"
				on:click={skip}
				transition:fade={{ duration: 200, easing: cubicOut }}
			>
				<IcoSkip classCss="skip-icon" />
			</button>
			<a
				class="bar-element"
				href="https://www.google.com/search?q={dish.urlName}"
				target="_blank"
				rel="noopener noreferrer"
				transition:fade={{ duration: 200, easing: cubicOut }}
			>
				<IcoSymlink />
			</a>
		{/if}
	</div>
</div>

<style lang="postcss">
	.cmd-bar {
		@apply w-fit px-5 py-1;
		@apply rounded-full bg-white;
		@apply transition-all duration-200 ease-out;
	}
	.cmd-bar .bar-element {
		@apply p-2;
		@apply rounded-full;
		@apply h-10 w-10;
		@apply transition-colors ease-in;
	}
	.cmd-bar .bar-element:hover {
		@apply outline-none;
		background: rgba(0, 0, 0, 0.1);
	}
</style>
