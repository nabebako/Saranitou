<script lang="ts">
	import Recomendation from '$lib/recomendation.svelte';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
	import Help from '$lib/help.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import Theme from '$lib/theme.svelte';
	import Logo from '$lib/logo.svelte';
	import { onMount } from 'svelte';

	import '$css/global.css';

	onMount(() => {
		document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		window.addEventListener('resize', () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`));
	});
</script>

<svelte:head>
	<title>Saranitou • Discover and start cooking</title>
</svelte:head>


<div class="full-screen grid fullpage-grid min-h-fit">
	<Header>
		<div class="w-10 flex items-center justify-center" slot="left">
			<Sidebar iconSize={24}>
				<div class="sm:hidden" slot="before">
					<Theme />
				</div>
			</Sidebar>
		</div>
		<svelte:fragment slot="center">
			<Logo />
		</svelte:fragment>
		<a href="/dish/4/temaki">blah</a>
		<div class="flex space-x-2" slot="right">
			<div class="hidden sm:inline">
				<Theme />
			</div>
			<Help />
		</div>
	</Header>
	<main class="overflow-hidden bg-neutral-100 dark:bg-neutral-600">
		<div class="relative h-full">
			<div class="py-8">
				<Recomendation />
			</div>
		</div>
	</main>
	<Footer />
</div>

<style lang="postcss">
	.fullpage-grid {
		grid-template-rows: auto 1fr auto;
	}
	.full-screen {
		min-height: 100vh;
		min-height: calc(var(--vh, 1vh) * 100);
		width: 100vw;
	}
</style>