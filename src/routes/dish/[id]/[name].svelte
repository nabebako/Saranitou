<script lang="ts">
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
	import Help from '$lib/help.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import Theme from '$lib/theme.svelte';
	import Logo from '$lib/logo.svelte';

	import '$css/global.css';

	import { onMount } from 'svelte';

	export let dish: DocumentDish = {
		id: '',
		name: {
			en: '',
			jp: '',
		},
		description: '',
		image: '',
		ingredients: [],
		urlName: '',
	};

	let shouldShowNav = false;

	onMount(() => {
		document.addEventListener('scroll', () => {
			shouldShowNav = window.scrollY !== 0;
		});
	});

</script>

<svelte:head>
	<title>{dish.name.en} • Saranitou</title>
</svelte:head>

<div class="fixed w-full {shouldShowNav? 'translate-y-0':'-translate-y-full'} transition-transform duration-300 ease-out z-50">
	<Header>
		<div class="w-10 flex items-center justify-center" slot="left">
			<Sidebar iconSize={24}>
				<div class="sm:hidden" slot="before">
					<Theme />
				</div>
			</Sidebar>
		</div>
	
		<svelte:fragment slot="center">
			<Logo/>
		</svelte:fragment>
		<div class="flex space-x-2" slot="right">
			<div class="hidden sm:inline">
				<Theme />
			</div>
			<Help />
		</div>
	</Header>
</div>

<main class="bg-neutral-100 dark:bg-neutral-600">
	<div class="relative w-[100vw] h-[calc(var(--vh)*100)]">
		<span class="absolute block w-full h-full dish-image" style={`--url: url(${dish.image});`}></span>
		<div class="absolute flex w-full h-full flex-center-contents">
			<p class="text-9xl text-white">{dish.name.en}</p>
		</div>
	</div>
	<div class="main-container text-2xl max-w-[60ch]">
		<p>{dish.description}</p>
	</div>
</main>

<Footer />

<style lang="postcss">
	.dish-image {
		--filter: rgba(0, 0, 0, .4);
		background-image: linear-gradient(var(--filter), var(--filter)), var(--url);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>