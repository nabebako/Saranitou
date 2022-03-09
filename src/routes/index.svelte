<script lang="ts">
	import Options from '../lib/options.svelte';
	import Recomendation from '../lib/recomendation.svelte';
	import Theme from '../lib/theme.svelte';
	import Hamburger from '../lib/animation/hamburger.svelte';

	import '../styles/layout.css';
	import '../styles/theme.css';

	let options = {};
	let shouldShowSideBar = false;
</script>

<svelte:head>
	<title>Saraintou</title>
	<meta charset="utf-8" />
	<meta name="keywords" content="HTML, CSS, JavaScript, Food" />
	<meta name="author" content="Ken" />

	<link rel="icon" href="https://untitled-umber.vercel.app/favicon.jpg" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<meta property="og:title" content="Saraintou" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://untitled-umber.vercel.app" />
	<meta property="og:image" content="https://untitled-umber.vercel.app/favicon.jpg" />
	<meta
		property="og:description"
		content="This is a simple food suggestion website, currently in the prototype phase."
	/>

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Saraintou" />
	<meta name="twitter:description" content="An unnamed food suggestion project." />
	<meta name="twitter:image" content="https://untitled-umber.vercel.app/favicon.jpg" />
</svelte:head>
<header>
	<div
		class="py-3 lg:pt-8 lg:pb-6 mx-4 lg:mx-auto lg:w-4/5 lg:px-0 border-b border-light-border dark:border-dark-border lg:border-none"
	>
		<div class="header-grid grid grid-cols-5">
			<a class="w-fit block" href="./">
				<p class="text-xl text-center hidden lg:inline">Saraintou</p>
				<img class="lg:hidden icon" src="/favicon.jpg" alt="favicon" />
			</a>

			<div class="col-start-5 col-end-6">
				<div
					class="lg:hidden hover:cursor-pointer relative z-20"
					on:click={() => {
						shouldShowSideBar = !shouldShowSideBar;
					}}
				>
					<Hamburger canvasWidth={24} canvasHeight={24} />
				</div>
				<div
					class="absolute lg:static top-0 right-0 z-10 overflow-hidden h-screen lg:h-fit lg:w-fit transition-width duration-200 bg-light-background dark:bg-dark-background lg:!bg-transparent
					{shouldShowSideBar
						? 'w-screen'
						: 'w-0'}"
				>
					<div class="mx-4 lg:mx-0 pt-2 lg:pt-0 border-y mt-12 lg:mt-0 border-light-border dark:border-dark-border lg:border-none h-full justify-end lg:justify-start space-x-4 grid lg:flex option-gird">
						<div class="absolute lg:static top-0 left-0 ml-6 lg:mx-0 pt-3 lg:pt-0">
							<Theme />
						</div>
						<Options bind:options />
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
<main>
	<div class="px-8 mt-4 lg:mt-8">
		<Recomendation bind:options />
	</div>
</main>
