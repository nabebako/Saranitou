<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let shouldShowOptions = false;
	const currentTheme = writable('');

	function setTheme(theme: string): void {
		if (theme === 'light') document.documentElement.classList.remove('dark-mode');
		else if (theme === 'dark') document.documentElement.classList.add('dark-mode');
		else {
			window?.matchMedia('(prefers-color-scheme: dark)').matches
				? document.documentElement.classList.add('dark-mode')
				: document.documentElement.classList.remove('dark-mode');
		}
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
			if($currentTheme === 'system') setTheme(event.matches? 'dark' : 'light');
		});
	});
</script>

<div class="hover:cursor-pointer" on:click={() => (shouldShowOptions = !shouldShowOptions)}>
	<img class="select-none" src="/favicon.png" alt="Hello" />
</div>
{#if shouldShowOptions}
	<div class="absolute">
		<ul>
			<li
				class="hover:cursor-pointer"
				on:click={() => {
					currentTheme.set('light');
					shouldShowOptions = false;
				}}
			>
				Light
			</li>
			<li
				class="hover:cursor-pointer"
				on:click={() => {
					currentTheme.set('dark');
					shouldShowOptions = false;
				}}
			>
				Dark
			</li>
			<li
				class="hover:cursor-pointer"
				on:click={() => {
					currentTheme.set('system');
					shouldShowOptions = false;
				}}
			>
				System
			</li>
		</ul>
	</div>
{/if}
