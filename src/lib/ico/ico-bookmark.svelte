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
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M14.2796 26.7576L10.7204 29.4158C8.73205 30.9008 6 29.3831 6 26.7936V5.20082C6 3.43306 7.34315 2 9 2H23C24.6569 2 26 3.43306 26 5.20082V26.7936C26 29.3831 23.2679 30.9008 21.2796 29.4158L17.7204 26.7576C16.6874 25.9861 15.3126 25.9861 14.2796 26.7576ZM10 24.7444L11.9858 23.2613C14.396 21.4612 17.604 21.4612 20.0142 23.2613L22 24.7444V12V11V9C22 7.34315 20.6569 6 19 6H13C11.3431 6 10 7.34315 10 9V11V12V24.7444Z"
		/>
	</g>
</svg>

<style lang="postcss">
	.color-primary {
		fill: #ed5f76;
	}
</style>
