<script lang="ts">
	export let dish: object;
</script>

<body>
	<main>
		{#each Object.keys(dish) as key}
			<p>{dish[key]}</p>
		{/each}
	</main>
</body>
