<script>
	export let item;
</script>

<div class="media-card glass">
	<div class="relative flex justify-end flex-col">
		<a class="absolute block h-full w-full bg-white" href="/{item.id}">
			<img class="w-full h-full object-cover select-none" src={item.image} alt={item.name} on:error={function(){this.src = '/default.svg'}}>
		</a>
		<div class="overlay p-4">
			<a class="text-base text-white hover:text-secondary-300 transition-colors duration-300" href="/{item.id}">{item.name}</a>
		</div>
	</div>
	<div class="p-4">
		<p>{item.description}</p>
	</div>
</div>

<style lang="postcss">
	.media-card {
		@apply h-64;
		@apply grid;
		grid-template-columns: 12rem 1fr;
		@apply rounded;
		@apply overflow-hidden;
	}
	.overlay {
		@apply relative;
		background-color: hsl(293, 6%, 25%, 0.85);
	}
</style>