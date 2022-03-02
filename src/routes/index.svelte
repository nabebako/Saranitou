<script lang="ts">
	import Recomendation from '../lib/recomendation.svelte';
	import Theme from '../lib/theme.svelte';
	import '../styles/layout.css';
	import '../styles/theme.css';
</script>

<svelte:head>
	<title>Untitled</title>
	<meta charset="utf-8" />
	<meta name="keywords" content="HTML, CSS, JavaScript, food">
	<meta name="author" content="Ken">

	<link rel="icon" href="https://untitled-umber.vercel.app/favicon.jpg" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<meta property="og:title" content="Untitled Project" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://untitled-umber.vercel.app" />
	<meta property="og:image" content="https://untitled-umber.vercel.app/favicon.jpg" />
	<meta property="og:description" content="This is a simple food suggestion website, currently in the prototype phase." />

	<meta name="twitter:card" content="summary">
	<meta name="twitter:title" content="Untitled Project">
	<meta name="twitter:description" content="An unnamed food suggestion project.">
	<meta name="twitter:image" content="https://untitled-umber.vercel.app/favicon.jpg">
</svelte:head>

<header>
	<Theme />
</header>
<main>
	<p class="text-xl text-center pb-4">Untitled project</p>
	<Recomendation />
</main>
