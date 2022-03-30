<script lang="ts">
	import Options from '../lib/options.svelte';
	import Recomendation from '../lib/recomendation.svelte';
	import Theme from '../lib/theme.svelte';
	import Hamburger from '../lib/animation/hamburger.svelte';
	import Header from '../lib/header.svelte';
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

	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

	<meta property="og:url" content="https://untitled-umber.vercel.app" />
	<meta property="og:title" content="Saraintou" />
	<meta property="og:type" content="website" />
	<!-- <meta property="og:image" content="https://untitled-umber.vercel.app/saranitou-social.png" /> -->
	<meta
		property="og:description"
		content="This is a simple food suggestion website, currently in the prototype phase."
	/>

	<meta property="twitter:creator" content="ken_tummada">
	<!-- <meta property="twitter:creator:id" content=""> -->
	<meta property="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="Saraintou" />
	<meta name="twitter:description" content="An unnamed food suggestion project." />
	<!-- <meta name="twitter:image" content="https://untitled-umber.vercel.app/saranitou-social.jpg" /> -->
</svelte:head>

<Header>
	<a class="w-fit block justify-self-center lg:flex space-x-1" href="./">
		<svg width="32" height="32" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M119.566 180.683C124.346 180.683 140.433 172.379 151.75 173.571C156.207 174.04 163.28 175.476 169.395 179.429C176.393 183.952 182.245 192.394 184.389 199.405C184.805 200.767 183.452 201.876 182.104 201.42C172.031 198.02 162.519 197.425 157.158 198.686C151.233 200.08 145.456 204.225 140.588 208.429C135.822 212.545 129.943 215.268 119.566 215.268C109.189 215.268 103.31 212.545 98.5439 208.429C93.6759 204.225 87.8993 200.08 81.9747 198.686C76.6136 197.425 67.1018 198.02 57.0289 201.42C55.6799 201.876 54.3273 200.767 54.7436 199.405C56.8874 192.394 62.7396 183.952 69.7373 179.429C75.8522 175.476 82.9253 174.04 87.3826 173.571C98.6994 172.379 114.786 180.683 119.566 180.683Z" fill="#ED5F76"/>
			<path d="M129.671 148.14C129.671 146.091 131.332 144.43 133.381 144.43H181.622C183.672 144.43 185.333 146.091 185.333 148.14V149.996C185.333 152.045 183.672 153.707 181.622 153.707H133.381C131.332 153.707 129.671 152.045 129.671 149.996V148.14Z" fill="#ED5F76"/>
			<path d="M54.667 148.14C54.667 146.091 56.3284 144.43 58.3778 144.43H106.619C108.668 144.43 110.329 146.091 110.329 148.14V149.996C110.329 152.045 108.668 153.707 106.619 153.707H58.3778C56.3284 153.707 54.667 152.045 54.667 149.996V148.14Z" fill="#ED5F76"/>
			<path d="M174.406 124.683V25.845C174.406 19.8616 169.23 15.0112 162.844 15.0112L156.907 15.0111L156.907 101.468C156.907 102.665 155.872 103.635 154.595 103.635H152.341C151.064 103.635 150.029 102.665 150.029 101.468L150.029 15.0111L123.439 15.0111L123.439 101.468C123.439 102.665 122.404 103.635 121.127 103.635H118.873C117.596 103.635 116.561 102.665 116.561 101.468L116.561 15.0111L83.0932 15.0112L89.9715 15.0112L89.9715 101.468C89.9715 102.665 88.9362 103.635 87.659 103.635H85.4056C84.1284 103.635 83.0932 102.665 83.0932 101.468L83.0932 15.0112H77.1559C70.7704 15.0112 65.5939 19.8616 65.5939 25.845L65.5939 124.683H174.406Z" fill="#ED5F76"/>
		</svg>
		<p class="text-xl text-center hidden lg:inline text-white">Saraintou</p>
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
</Header>

<main class="overflow-hidden bg-neutral-100 dark:bg-neutral-600">
	<Recomendation />
</main>
<Footer />
