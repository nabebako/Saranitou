<script>
	import { onMount } from 'svelte';

	let saveList = [];

	onMount(() => {
		saveList = JSON.parse(localStorage.getItem('like-list')) ?? [];
	});
</script>

<ul>
	{#each saveList as item}
		<li>{item}</li>
	{/each}
</ul>
