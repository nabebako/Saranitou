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
			d="M22 8.5C22 10.433 20.433 12 18.5 12C16.567 12 15 10.433 15 8.5C15 8.10335 15.066 7.72211 15.1876 7.36666C16.2241 6.51279 17.5521 6 18.9999 6C19.8378 6 20.6356 6.17175 21.36 6.48197C21.7631 7.05227 22 7.74848 22 8.5Z"
		/>
		<path
			d="M7.00006 29C5.89549 30.1046 4.10463 30.1046 3.00006 29C1.89549 27.8954 1.89549 26.1046 3.00006 25L10.589 17.411C11.6288 19.024 13.1199 20.3186 14.8838 21.1162L7.00006 29Z"
		/>
	</g>
	<g class="color-secondary">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M29 12C29 17.5228 24.5228 22 19 22C17.5327 22 16.1392 21.684 14.8838 21.1163C13.1199 20.3186 11.6288 19.024 10.589 17.411C9.58348 15.8513 9 13.9938 9 12C9 6.47715 13.4772 2 19 2C24.5228 2 29 6.47715 29 12ZM19 18C22.3137 18 25 15.3137 25 12C25 9.52419 23.5005 7.39861 21.3601 6.48197C20.6357 6.17175 19.8379 6 19 6C17.5522 6 16.2242 6.51279 15.1876 7.36666C13.8517 8.46712 13 10.1341 13 12C13 15.3137 15.6863 18 19 18Z"
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
