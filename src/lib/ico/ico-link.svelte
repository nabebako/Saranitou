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
			d="M30 4V13C30 14.1046 29.1045 15 28 15C26.8954 15 26 14.1046 26 13V9.04042L16.1209 18.7669C15.7228 19.1589 15.1865 19.3786 14.6279 19.3786H14.5287C13.4081 19.3786 12.4997 18.4702 12.4998 17.3496C12.4998 16.8061 12.7179 16.2852 13.1052 15.9039L23.1644 6H19C17.8954 6 17 5.10457 17 4C17 2.89543 17.8954 2 19 2H28C29.1045 2 30 2.89543 30 4Z"
		/>
	</g>
	<g class="color-secondary">
		<path
			d="M11.5 5H13.5C14.3284 5 15 6.17157 15 7C15 7.82843 14.3284 9 13.5 9H11.5H8C6.34315 9 6 9.34315 6 11V24C6 25.6569 6.34315 26 8 26H21C22.6569 26 23 25.6569 23 24V20.5V18.5C23 17.6716 24.1716 17 25 17C25.8284 17 27 17.6716 27 18.5V20.5V27C27 28.6569 25.6569 30 24 30H5C3.34315 30 2 28.6569 2 27V8C2 6.34315 3.34315 5 5 5H11.5Z"
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
