<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let shouldShowOptions = false;
	const currentTheme = writable('');

	function setTheme(theme: string): void {
		if (theme === 'light') document.documentElement.classList.remove('dark');
		else if (theme === 'dark') document.documentElement.classList.add('dark');
		else {
			window?.matchMedia('(prefers-color-scheme: dark)').matches
				? document.documentElement.classList.add('dark')
				: document.documentElement.classList.remove('dark');
		}
		document.documentElement.dispatchEvent(new CustomEvent('theme-change'));
	}

	onMount(() => {
		currentTheme.set(
			localStorage.getItem('theme') ??
				(window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
		);
		currentTheme.subscribe((val) => {
			localStorage.setItem('theme', val);
			setTheme(val);
		});
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			if ($currentTheme === 'system') setTheme(event.matches ? 'dark' : 'light');
		});
	});
</script>

<div class="theme-option">
	<div class="bnt" on:click={() => (shouldShowOptions = !shouldShowOptions)}>
		<p>Theme</p>
		<!-- <img class="select-none" src="" alt="Theme" /> -->
	</div>
	<div class="mt-2 absolute z-10 transition-all duration-500 h-0 overflow-hidden {shouldShowOptions? 'h-40':''}">
		<ul class="text-center divide-y text-button-text bg-button-bg p-2 rounded-lg w-24">
			<li
				class="bnt !rounded-none !mx-0 !w-full"
				on:click={() => {
					currentTheme.set('light');
					shouldShowOptions = false;
				}}
			>
				Light
			</li>
			<li
				class="bnt !rounded-none !mx-0 !w-full"
				on:click={() => {
					currentTheme.set('dark');
					shouldShowOptions = false;
				}}
			>
				Dark
			</li>
			<li
				class="bnt !rounded-none !mx-0 !w-full"
				on:click={() => {
					currentTheme.set('system');
					shouldShowOptions = false;
				}}
			>
				System
			</li>
		</ul>
	</div>
</div>
