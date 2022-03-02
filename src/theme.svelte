<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import './main.css';

	let shouldShowOptions = false;
	const currentTheme = writable('');

	onMount(() => {
		currentTheme.set(
			localStorage.getItem('theme') ?? window?.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
		);
		currentTheme.subscribe((val) => {
			localStorage.setItem('theme', val);
			if (val === 'light') document.documentElement.classList.remove('dark-mode');
			else if (val === 'dark') document.documentElement.classList.add('dark-mode');
			else {
				if (window?.matchMedia('(prefers-color-scheme: dark)').matches)
					document.documentElement.classList.add('dark-mode');
				else document.documentElement.classList.remove('dark-mode');
			}
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
