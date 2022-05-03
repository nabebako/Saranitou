<script>
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
	import Help from '$lib/help.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import Theme from '$lib/theme.svelte';
	import Logo from '$lib/logo.svelte';

	import '$css/layout.css';
	import '$css/theme.css';

	export let name = {};
	export let description = '';
</script>

<svelte:head>
	<title>{name} • Saranitou</title>
</svelte:head>

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

<main class="bg-neutral-100 dark:bg-neutral-600">
	<p>{name}</p>
	<p>{description}</p>
</main>

<Footer />