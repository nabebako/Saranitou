<script>
	import Options from '$lib/options.svelte';
	import Header from '$lib/header.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import Help from '$lib/help.svelte';
	import Theme from '$lib/theme.svelte';
	import Footer from '$lib/footer.svelte';
	import Logo from '$lib/logo.svelte';

	import '$css/layout.css';
	import '$css/theme.css';
</script>

<svelte:head>
	<title>Option • Saranitou</title>
</svelte:head>

	<Header>
		<div class="w-10 flex items-center justify-center" slot="left">
			<Sidebar>
				<a class="bnt" slot="before" href="/">Recomendation</a>
			</Sidebar>
		</div>
		<svelte:fragment slot="center">
			<Logo/>
		</svelte:fragment>
		<div class="flex space-x-2" slot="right">
			<Theme />
			<Help />
		</div>
	</Header>
	<main>
		<div class="main-container">
			<Options />
		</div>
	</main>
	<Footer />
