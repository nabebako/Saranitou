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
		<circle cx="16" cy="16" r="6" />
	</g>
	<g class="color-secondary">
		<rect x="15" y="2" width="2" height="6" rx="1" />
		<rect x="5" y="6.41418" width="2" height="6" rx="1" transform="rotate(-45 5 6.41418)" />
		<rect x="21" y="22.4142" width="2" height="6" rx="1" transform="rotate(-45 21 22.4142)" />
		<rect x="15" y="24" width="2" height="6" rx="1" />
		<rect
			x="22.4143"
			y="10.6569"
			width="2"
			height="6"
			rx="1"
			transform="rotate(-135 22.4143 10.6569)"
		/>
		<rect
			x="6.41431"
			y="26.6569"
			width="2"
			height="6"
			rx="1"
			transform="rotate(-135 6.41431 26.6569)"
		/>
		<rect x="24" y="17" width="2" height="6" rx="1" transform="rotate(-90 24 17)" />
		<rect x="2" y="17" width="2" height="6" rx="1" transform="rotate(-90 2 17)" />
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
