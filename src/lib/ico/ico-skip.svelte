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
			d="M28.9734 13.73C30.3422 14.9016 30.3422 17.0984 28.9734 18.27L17.2133 28.3365C15.3928 29.8948 12.6667 28.5337 12.6667 26.0665L12.6667 5.9335C12.6667 3.46628 15.3928 2.10517 17.2133 3.66348L28.9734 13.73Z"
		/>
	</g>
	<g class="color-secondary">
		<path
			d="M20.0219 13.73C21.3667 14.9016 21.3667 17.0984 20.0219 18.27L8.46722 28.3365C6.67854 29.8948 4 28.5337 4 26.0665L4 5.9335C4 3.46628 6.67855 2.10517 8.46722 3.66348L20.0219 13.73Z"
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
