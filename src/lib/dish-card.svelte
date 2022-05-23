<script lang="ts">
	export let item: DocumentDish;
</script>

<div class="media-card glass font-handwriting">
	<div class="relative flex justify-end flex-col">
		<a class="absolute block h-full w-full bg-white" href="/dish/{item.id}/{item.urlName}">
			<img
				class="w-full h-full object-cover select-none"
				src={item.image || '/default.svg'}
				alt={item.name.en}
				on:error={function () {
					this.src = '/default.svg';
				}}
			/>
		</a>
		<div class="overlay p-4">
			<a
				class="text-base text-white hover:text-secondary-300 transition-colors duration-300"
				href="/dish/{item.id}/{item.urlName}">{item.name.en}</a
			>
		</div>
	</div>
	<div class="p-4">
		<p>{item.description}</p>
	</div>
</div>

<style lang="postcss">
	.media-card {
		@apply h-48;
		@apply grid;
		grid-template-columns: 9rem 1fr;
		@apply rounded;
		@apply overflow-hidden;
	}
	@media screen(lg) {
		.media-card {
			@apply h-64;
			grid-template-columns: 12rem 1fr;
		}
	}
</style>
