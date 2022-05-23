<script>
	import { onMount } from "svelte";

	onMount(() => {
		document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		window.addEventListener('resize', () => {
			document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		});
	});
</script>
<slot></slot>