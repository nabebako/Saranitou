<script lang="ts">
	import def from './ico-default';

	export let width = def.width;
	export let height = def.height;
	export let classCss = def.class;
</script>

<svg
	{width}
	{height}
	class={classCss}
	viewBox="0 0 32 32"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<g class="color-primary">
		<path
			d="M17 29C9.8203 29 4 23.1797 4 16C4 9.17614 9.25768 3.58027 15.9431 3.04236C13.5466 4.86923 12 7.75401 12 11C12 16.5229 16.4772 21 22 21C25.246 21 28.1308 19.4534 29.9577 17.0569C29.4197 23.7423 23.8239 29 17 29Z"
		/>
	</g>
</svg>

<style lang="postcss">
	.color-primary {
		fill: #ed5f76;
	}
</style>
