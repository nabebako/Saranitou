<script lang="ts" context='module'>
	export const prerender = true;
</script>
<script lang="ts">
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
	import SaveList from '$lib/save-list.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import Help from '$lib/help.svelte';
	import Theme from '$lib/theme.svelte';
	import Logo from '$lib/logo.svelte';

	import '$css/layout.css';
	import '$css/theme.css';
</script>

<svelte:head>
	<title>Liked Dishes • Saranitou</title>
</svelte:head>

<body>
	<Header>
		<div slot="left">
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
			<SaveList />
		</div>
	</main>
	<Footer />
</body>
