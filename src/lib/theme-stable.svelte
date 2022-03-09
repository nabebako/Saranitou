<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let shouldShowOptions = false;
	const theme = writable('');

	function setTheme(themeToSet: string): void {
		if (themeToSet === 'light') document.documentElement.classList.remove('dark');
		else if (themeToSet === 'dark') document.documentElement.classList.add('dark');
		else if(themeToSet === 'system') {
			window?.matchMedia('(prefers-color-scheme: dark)').matches
				? document.documentElement.classList.add('dark')
				: document.documentElement.classList.remove('dark');
		}
		else {
			theme.set('system');
			return;
		}
		document.documentElement.dispatchEvent(new CustomEvent('theme-change'));
	}
	function cycleTheme() {
		const currentTheme = localStorage.getItem('theme');
		if(currentTheme === 'light') {
			theme.set('dark');
		}
		else if(currentTheme === 'dark') {
			theme.set('system');
		}
		else if(currentTheme === 'system') {
			theme.set('light');
		}
	}

	onMount(() => {
		theme.set(
			localStorage.getItem('theme') ??
			(window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
		);
		theme.subscribe((val) => {
			localStorage.setItem('theme', val);
			setTheme(val);
		});
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			if ($theme === 'system') setTheme(event.matches ? 'dark' : 'light');
		});
	});
</script>

<div class="hidden lg:block">
	<div class="bnt" on:click={() => (shouldShowOptions = !shouldShowOptions)}>
		<p>Theme</p>
		<!-- <img class="select-none" src="" alt="Theme" /> -->
	</div>
	<div class="mt-2 absolute bottom-1/2 lg:bottom-auto left-0 lg:left-auto z-10 transition-all duration-500 h-0 overflow-hidden {shouldShowOptions? 'h-40':''}">
		<ul class="text-center divide-y text-button-text bg-button-bg p-2 rounded-lg w-24">
			<li
				class="bnt !rounded-none !mx-0 !w-full"
				on:click={() => {
					theme.set('light');
					shouldShowOptions = false;
				}}
			>
				Light
			</li>
			<li
				class="bnt !rounded-none !mx-0 !w-full"
				on:click={() => {
					theme.set('dark');
					shouldShowOptions = false;
				}}
			>
				Dark
			</li>
			<li
				class="bnt !rounded-none !mx-0 !w-full"
				on:click={() => {
					theme.set('system');
					shouldShowOptions = false;
				}}
			>
				System
			</li>
		</ul>
	</div>
</div>
<div class="lg:hidden">
	<button on:click="{cycleTheme}">
		{#if $theme === 'light'}
			<svg class="icon" viewBox="0 0 339 379" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M169.5 306.236C152.396 306.236 136.022 303.122 120.917 297.431C68.9534 277.855 32 227.79 32 169.118C32 93.3898 93.5608 32 169.5 32C245.439 32 307 93.3898 307 169.118C307 203.503 294.308 234.932 273.341 259M169.5 306.236L138.792 232.649M169.5 306.236L93.4167 346" stroke="#B8B8B8" stroke-width="64" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		{:else if $theme === 'dark'}
			<svg class="icon" viewBox="0 0 339 379" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M169.5 306.236C152.396 306.236 136.022 303.122 120.917 297.431C68.9534 277.855 32 227.79 32 169.118C32 93.3898 93.5608 32 169.5 32C245.439 32 307 93.3898 307 169.118C307 203.503 294.308 234.932 273.341 259M169.5 306.236L138.792 232.649M169.5 306.236L93.4167 346" stroke="#B8B8B8" stroke-width="64" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		{:else}
			<svg class="icon" viewBox="0 0 339 379" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M169.5 306.236C152.396 306.236 136.022 303.122 120.917 297.431C68.9534 277.855 32 227.79 32 169.118C32 93.3898 93.5608 32 169.5 32C245.439 32 307 93.3898 307 169.118C307 203.503 294.308 234.932 273.341 259M169.5 306.236L138.792 232.649M169.5 306.236L93.4167 346" stroke="#B8B8B8" stroke-width="64" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		{/if}
	</button>
</div>
