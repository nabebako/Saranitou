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
		<path d="M10 10C8.89543 10 8 9.10457 8 8V3H12V8C12 9.10457 11.1046 10 10 10Z" />
		<path
			d="M10 23C9.44772 23 9 22.5523 9 22C9 21.4477 9.44772 21 10 21H22C22.5523 21 23 21.4477 23 22C23 22.5523 22.5523 23 22 23H10Z"
		/>
		<path
			d="M10 27C9.44772 27 9 26.5523 9 26C9 25.4477 9.44772 25 10 25H22C22.5523 25 23 25.4477 23 26C23 26.5523 22.5523 27 22 27H10Z"
		/>
	</g>
	<g class="color-secondary">
		<path
			d="M3 26V6C3 4.34315 4.34315 3 6 3V10C6 11.1046 6.89543 12 8 12H19C20.1046 12 21 11.1046 21 10V3H23.4289L29 8.57111V26C29 27.6569 27.6569 29 26 29H25V20C25 18.8954 24.1046 18 23 18H9C7.89543 18 7 18.8954 7 20V29H6C4.34315 29 3 27.6569 3 26Z"
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
