<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	const theme = writable('');

	function cycleTheme() {
		theme.update((currentTheme) => {
			if (currentTheme === 'light') return 'dark';
			else if (currentTheme === 'dark') return 'system';
			else if (currentTheme === 'system') return 'light';
			else return 'light';
		});
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import IcoThemeLight from './ico/ico-theme-light.svelte';
	import IcoThemeDark from './ico/ico-theme-dark.svelte';
	import IcoThemeOs from './ico/ico-theme-system.svelte';

	export let iconSize = 24;

	onMount(() => {
		theme.set(localStorage.getItem('theme') ?? 'light');
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', () => theme.update((currentTheme) => currentTheme));

		theme.subscribe((val) => {
			if (val === 'light') {
				document.documentElement.classList.remove('dark');
			} else if (val === 'dark') {
				document.documentElement.classList.add('dark');
			} else if (val === 'system') {
				window?.matchMedia('(prefers-color-scheme: dark)').matches
					? document.documentElement.classList.add('dark')
					: document.documentElement.classList.remove('dark');
			} else {
				theme.set('light');
				return;
			}
			localStorage.setItem('theme', val);
			document.documentElement.dispatchEvent(new CustomEvent('theme-change'));
		});
	});
</script>

<button class="block" on:click={cycleTheme} title="Theme | {$theme}">
	{#if $theme === 'light'}
		<IcoThemeLight width={iconSize} height={iconSize} />
	{:else if $theme === 'dark'}
		<IcoThemeDark width={iconSize} height={iconSize} />
	{:else}
		<IcoThemeOs width={iconSize} height={iconSize} />
	{/if}
</button>
