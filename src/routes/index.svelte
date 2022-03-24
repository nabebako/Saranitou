<script lang="ts">
	import Options from '../lib/options.svelte';
	import Recomendation from '../lib/recomendation.svelte';
	import Theme from '../lib/theme.svelte';
	import Hamburger from '../lib/animation/hamburger.svelte';
	import Footer from '../lib/footer.svelte';

	import '../styles/layout.css';
	import '../styles/theme.css';

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

<header class="bg-neutral-700">
	<div class="py-4 lg:pt-8 lg:pb-6 mx-4 lg:mx-auto lg:w-4/5 lg:px-0">
		<div class="head-nav-grid">
			<a class="w-fit block justify-self-center" href="./">
				<p class="text-xl text-center hidden lg:inline text-primary-300">Saraintou</p>
				<img class="lg:hidden" width="24" height="24" src="/favicon.jpg" alt="Saraintou" />
			</a>

			<div class="col-start-5 col-end-6">
				<div
					class="lg:hidden relative hover:cursor-pointer z-20"
					on:click={() => {
						shouldShowSideBar = !shouldShowSideBar;
					}}
				>
					<Hamburger canvasWidth={24} canvasHeight={24} />
				</div>
				<div
					class="absolute lg:static top-0 right-0 z-10 overflow-hidden h-screen lg:h-fit lg:w-fit transition-width bg-neutral-700
					{shouldShowSideBar ? 'w-screen' : 'w-0'}"
				>
					<div
						class="px-4 lg:px-0 pt-2 lg:pt-0 mt-14 lg:mt-0 h-full justify-start lg:space-x-4 block lg:flex bg-neutral-100 dark:bg-neutral-600 lg:!bg-transparent"
					>
						<div class="absolute lg:static top-0 left-0 ml-6 lg:mx-0 pt-4 lg:pt-0">
							<Theme />
						</div>
						<div>
							<Options />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
<main class="overflow-hidden bg-neutral-100 dark:bg-neutral-600">
	<Recomendation />
</main>
<footer>
	<Footer />
</footer>

<style lang="postcss">
	:global(#svelte) {
		@apply h-full;
	}
	.head-nav-grid {
		@apply grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: 1fr;
		@apply items-center;
		@apply justify-items-center lg:justify-items-start;
		@apply gap-x-4;
	}
</style>
