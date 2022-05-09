<script lang="ts">
	import Theme from '$lib/theme.svelte';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import Logo from '$lib/logo.svelte';

	import '$css/global.css';
</script>

<svelte:head>
	<title>About • Creator</title>
</svelte:head>

<Header>
	<div slot="left">
		<Sidebar />
	</div>
	<svelte:fragment slot="center">
		<Logo/>
	</svelte:fragment>
	<div class="flex space-x-2" slot="right">
		<Theme />
	</div>
</Header>

<main>
	<h1 class="text-center">About</h1>
</main>

<Footer />
