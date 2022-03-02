<script lang="ts" context="module">
	import { browser } from '$app/env';
	import '../styles/layout.css';
	import '../styles/theme.css';

	export const router = browser;
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>
<main>
	<a href="/">Back</a>
	<h1 class="text-center">About us</h1>
</main>