<script lang="ts">
	import { onMount } from 'svelte';
	import { Circle, AnimationControler } from './2d-animation';

	export let canvasWidth = 500;
	export let canvasHeight = 500;

	let canvas: HTMLCanvasElement;

	const controler = new AnimationControler();
	controler.setOptions({
		tickPerSecond: 350,
		shouldReverse: true,
		shouldReduceQueue: true
	});

	const c1 = new Circle(0.5 * canvasWidth, 0.2 * canvasHeight, 2);
	const c2 = new Circle(0.5 * canvasWidth, 0.5 * canvasHeight, 2);
	const c3 = new Circle(0.5 * canvasWidth, 0.8 * canvasHeight, 2);

	c1.addAnimation(
		'curve',
		[
			{ x: 0.8 * canvasWidth, y: 0.25 * canvasHeight },
			{ x: 0.9 * canvasWidth, y: 0.6 * canvasHeight },
			{ x: 0.7 * canvasWidth, y: 0.6 * canvasHeight }
		],
		controler
	);

	c2.addAnimation(
		'curve',
		[
			{ x: 0.2 * canvasWidth, y: 0.25 * canvasHeight },
			{ x: 0.4 * canvasWidth, y: 0.2 * canvasHeight },
			{ x: 0.5 * canvasWidth, y: 0.3 * canvasHeight }
		],
		controler
	);

	c3.addAnimation(
		'curve',
		[
			{ x: 0.8 * canvasWidth, y: 0.25 * canvasHeight },
			{ x: 0.4 * canvasWidth, y: 0.5 * canvasHeight },
			{ x: 0.3 * canvasWidth, y: 0.6 * canvasHeight }
		],
		controler
	);

	onMount(() => {
		controler.crateNewCanvas(canvas, 500, 500, canvasWidth, canvasHeight);

		controler.canvas.fixDpi().setCtx((ctx) => {
			ctx.fillStyle = 'hsl(350, 70%, 65%)';
			return ctx;
		});

		controler.render();
	});
</script>

<canvas height={canvasHeight} width={canvasWidth} on:click={controler.start} bind:this={canvas} />
