<script>
	import Header from "$lib/header.svelte";
	import Footer from "$lib/footer.svelte";

	import { onMount } from "svelte";

	onMount(() => {
		document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		window.addEventListener('resize', () => {
			document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		});
	});
</script>

<div class="main">	
	<Header/>
	
	<slot></slot>
	
	<Footer/>
</div>