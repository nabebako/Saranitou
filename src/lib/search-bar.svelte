<script lang="ts">
	import { onMount } from 'svelte';
	import IcoSearch from './ico/ico-search.svelte';

	export let query = '';

	export let onQuerySend = (q: string) => {
		if (q.replace(/^\s*$/, '')) {
			let url = new window.URL(window.location.href);
			url.searchParams.set('q', q);
			window.location.assign(url);
		}
	};

	let searchInputEl: HTMLInputElement;

	onMount(() => {
		document.addEventListener('keydown', (ev) => {
			if (ev.key === 'k' && ev.metaKey) {
				ev.preventDefault();

				const end = searchInputEl.value.length;
				searchInputEl.setSelectionRange(end, end);
				searchInputEl.focus();
			}
		});
	});
</script>

<div class="flex justify-center space-x-4 w-fit text-input">
	<div class="rounded-xl bg-white box-shadow-sm">
		<input
			class="w-[40ch] border-none"
			type="text"
			name=""
			id="query-input"
			placeholder="type something..."
			bind:value={query}
			on:keydown={(ev) => {
				if (ev.key === 'Enter') onQuerySend(query);
			}}
			bind:this={searchInputEl}
		/>
		<kbd class="font-sans font-semibold mr-4 select-none">
			<abbr class="no-underline" title="Command">⌘</abbr>K
		</kbd>
	</div>

	<button
		class="grid center-contents h-fit p-2 rounded-full ico box-shadow-sm bg-white"
		on:click={() => onQuerySend(query)}
	>
		<IcoSearch />
	</button>
</div>

<style lang="postcss">
	:global(.ico path) {
		@apply transition-colors ease-in;
		fill: #433c44;
	}
	:global(.ico:hover path) {
		fill: #e4687c;
	}
</style>
