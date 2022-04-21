<script lang="ts">
	import { onMount } from 'svelte';

	export let x = 0;
	export let slideSpeed = 1.5;
	export let rotateSpeed = 0.04;
	export let slideThreshold = 0.6;

	export let onRight = () => {};
	export let onLeft = () => {};

	let body: HTMLBodyElement;
	let target: HTMLElement;

	let shouldMove = false;
	let startX = 0;

	// Event listeners to initiate drag
	function onMouseDown() {
		target.classList.remove('transition-transform', 'indicate-moveable');
		target.classList.add('z-40');
		body.classList.add('h-full', 'overflow-y-hidden');
		shouldMove = true;
		target.style.cursor = 'grabbing';
	}
	function onTouchStart(e: TouchEvent) {
		target.classList.remove('transition-transform', 'indicate-moveable');
		target.classList.add('z-40');
		body.classList.add('h-full', 'overflow-y-hidden');
		startX = e.touches.item(0).pageX;
		shouldMove = true;
	}

	function onMouseup() {
		x = 0;
		target.classList.add('transition-transform');
		target.classList.remove('z-40');
		body.classList.remove('h-full', 'overflow-y-hidden');
		target.style.transform = 'translate(0px) rotate(0deg)';
		shouldMove = false;
		target.style.cursor = 'grab';
	}
	function onTouchEnd() {
		x = 0;
		target.classList.add('transition-transform');
		target.classList.remove('z-40');
		body.classList.remove('h-full', 'overflow-y-hidden');
		target.style.transform = 'translate(0px) rotate(0deg)';
		shouldMove = false;
	}

	// Event listeners for movement
	function onMouseMove(e: MouseEvent) {
		if (shouldMove) {
			x += e.movementX * slideSpeed;
			target.style.transform = `translate(${x}px) rotate(${x * rotateSpeed}deg)`;
		}
		if (x > target.offsetWidth * slideThreshold) {
			onRight();
			target.style.transform = 'translate(0px) rotate(0deg)';
			x = 0;
			shouldMove = false;
		} else if (x < target.offsetWidth * -1 * slideThreshold) {
			onLeft();
			target.style.transform = 'translate(0px) rotate(0deg)';
			x = 0;
			shouldMove = false;
		}
	}
	function onTouchMove(e: TouchEvent) {
		if (shouldMove) {
			x = (e.targetTouches.item(0).clientX - startX) * slideSpeed;
			target.style.transform = `translate(${x}px) rotate(${x * rotateSpeed}deg)`;
		}
		if (x > target.offsetWidth * slideThreshold) {
			onRight();
			target.style.transform = 'translate(0px) rotate(0deg)';
			x = 0;
			shouldMove = false;
		} else if (x < target.offsetWidth * -1 * slideThreshold) {
			onLeft();
			target.style.transform = 'translate(0px) rotate(0deg)';
			x = 0;
			shouldMove = false;
		}
	}

	onMount(() => {
		body = document.querySelector('body');
	});
</script>

<svelte:window
	on:mouseup={onMouseup}
	on:touchend={onTouchEnd}
	on:mousemove={onMouseMove}
	on:touchmove={onTouchMove}
/>

<div
	class="relative cursor-grab"
	bind:this={target}
	on:mousedown={onMouseDown}
	on:touchstart={onTouchStart}
>
	<slot />
</div>
