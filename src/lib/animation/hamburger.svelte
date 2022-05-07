<script lang="ts">
	import { onMount } from 'svelte';
	import { Circle, AnimationControler } from './2d-animation';

	export let canvasWidth = 500;
	export let canvasHeight = 500;

	const controler = new AnimationControler();
	const c1 = new Circle(500, 200, 2);
	const c2 = new Circle(500, 500, 2);
	const c3 = new Circle(500, 800, 2);

	let canvas: HTMLCanvasElement;

	controler.setOptions({
		animationDuration: 150,
		shouldReverse: true,
		shouldReduceQueue: true,
	});
	
	c1.addAnimation('curve', [
		{ x: 800, y: 250 },
		{ x: 900, y: 600 },
		{ x: 700, y: 600 }
	], controler);

	c2.addAnimation('curve', [
		{ x: 200, y: 250 },
		{ x: 400, y: 200 },
		{ x: 500, y: 300 }
	], controler);

	c3.addAnimation('curve', [
		{ x: 800, y: 250 },
		{ x: 400, y: 500 },
		{ x: 300, y: 600 }
	], controler);

	onMount(() => {
		controler.crateNewCanvas(canvas, canvasWidth, canvasHeight, canvasWidth / 1000);

		controler.canvas.fixDpi().setCtx((ctx) => {
			ctx.fillStyle = 'hsl(350, 70%, 65%)';
			return ctx;
		});

		controler.render();
	});
</script>

<button class="p-2 rounded-full hover:bg-neutral-10 transition-colors ease-out" on:click={controler.start}>
	<canvas height={canvasHeight} width={canvasWidth} bind:this={canvas} />
</button>
