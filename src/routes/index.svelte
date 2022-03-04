<script lang="ts">
	import Options from '../lib/options.svelte';
	import Recomendation from '../lib/recomendation.svelte';
	import Theme from '../lib/theme.svelte';
	import Animation from '../lib/animation.svelte';

	import '../styles/layout.css';
	import '../styles/theme.css';

	let options = {};
	let shouldShowSideBar = false;
</script>

<svelte:head>
	<title>Untitled</title>
	<meta charset="utf-8" />
	<meta name="keywords" content="HTML, CSS, JavaScript, Food" />
	<meta name="author" content="Ken" />

	<link rel="icon" href="https://untitled-umber.vercel.app/favicon.jpg" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<meta property="og:title" content="Untitled Project" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://untitled-umber.vercel.app" />
	<meta property="og:image" content="https://untitled-umber.vercel.app/favicon.jpg" />
	<meta
		property="og:description"
		content="This is a simple food suggestion website, currently in the prototype phase."
	/>

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Untitled Project" />
	<meta name="twitter:description" content="An unnamed food suggestion project." />
	<meta name="twitter:image" content="https://untitled-umber.vercel.app/favicon.jpg" />
</svelte:head>
<header class="static z-10">
	<div
		class="pt-3 pb-3 lg:pt-8 lg:pb-6 mx-4 lg:mx-auto lg:w-4/5 lg:px-0 border-b border-light-border dark:border-dark-border lg:border-none"
	>
		<div class="header-grid grid grid-cols-5">
			<div class="w-fit">
				<p class="text-xl text-center hidden lg:inline">Untitled project</p>
				<img class="lg:hidden icon" src="/favicon.jpg" alt="favicon" />
			</div>
			<div class="col-start-5 col-end-6 relative lg:static">
				<div
					class="lg:hidden"
					on:click={() => {
						shouldShowSideBar = !shouldShowSideBar;
					}}
				>
					<Animation canvasWidth={24} canvasHeight={24} />
				</div>
				<div
					class="absolute lg:static right-0 translate-y-6 lg:transform-none {shouldShowSideBar
						? 'flex'
						: 'hidden'} lg:flex flex-col space-x-4 lg:flex-row"
				>
					<Theme />
					<Options bind:options />
				</div>
			</div>
		</div>
	</div>
</header>
<main>
	<Recomendation bind:options />
</main>
