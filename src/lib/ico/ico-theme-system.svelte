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
			d="M2 27C2 25.8954 2.89543 25 4 25H28C29.1046 25 30 25.8954 30 27V27C30 28.1046 29.1046 29 28 29H4C2.89543 29 2 28.1046 2 27V27Z"
		/>
	</g>
	<g class="color-secondary">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M7 5H25C26.6569 5 28 6.34315 28 8V20C28 21.6569 26.6569 23 25 23H7C5.34315 23 4 21.6569 4 20V8C4 6.34315 5.34315 5 7 5ZM25 8H7V20H25V8Z"
		/>
	</g>
</svg>

<style lang="postcss">
	.color-primary {
		fill: #ed5f76;
	}
	.color-secondary {
		fill: #ec96a4;
	}
</style>
