<script lang="ts">
	import Recomendation from '../lib/recomendation.svelte';
	import Theme from '../lib/theme.svelte';
	import '../styles/layout.css';
	import '../styles/theme.css';
</script>

<svelte:head>
	<title>Untitled</title>
</svelte:head>

<header>
	<Theme />
</header>
<main>
	<p class="text-xl text-center pb-4">Untitled project</p>
	<Recomendation />
</main>
