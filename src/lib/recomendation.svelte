<script lang="ts">
	import { onMount } from 'svelte';

	let name = '';
	let description = '';
	let loddingAnimation: HTMLDivElement;
	let resultImage: HTMLImageElement;
	let resultContainer: HTMLDivElement;
	let introduction: HTMLDivElement;

	function animate() {}
	function refresh() {
		const req = new XMLHttpRequest();
		const options = JSON.parse(localStorage.getItem('options')) ?? {};

		req.onload = () => {
			introduction.classList.add('hidden');
			const res = JSON.parse(req.response);
			name = res.name;
			description = res.description;
			resultImage.src = `/${res.img}`;
		};

		loddingAnimation.classList.remove('hidden');
		resultContainer.classList.add('hidden');

		animate();

		req.open('post', '/recomendation');
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(
			JSON.stringify({
				'current-time': new Date().toTimeString().match(/[0-9]{1,2}:[0-9]{2}:[0-9]{2}/)[0],
				options: { ...options }
			})
		);
	}

	onMount(() => {
		resultImage.addEventListener('load', () => {
			resultContainer.classList.remove('hidden');
			loddingAnimation.classList.add('hidden');
		});
	});
</script>

<div class="mx-auto text-center pb-4 w-fit" bind:this={introduction}>
	<h1 class="text-xl text-title font-semi-bold">Welcome</h1>
	<p class="text-base">Hit the button below to get a food recomendation.</p>
</div>

<div class="mx-auto w-fit">
	<div
		class="hidden w-full max-w-md sm:w-64 sm:h-64 aspect-square flex justify-center items-center"
		bind:this={loddingAnimation}
	>
		<svg class="w-48 h-48" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M194.5 321.236C177.396 321.236 161.022 318.122 145.917 312.431C93.9534 292.855 57 242.79 57 184.118C57 108.39 118.561 47 194.5 47C270.439 47 332 108.39 332 184.118C332 218.503 319.308 249.932 298.341 274M194.5 321.236L163.792 247.649M194.5 321.236L118.417 361"
				stroke="#B8B8B8"
				stroke-width="64"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
	<div class="hidden" bind:this={resultContainer}>
		<div class="relative text-center mb-4">
			<p id="title" class="text-center">{name}</p>
			<img
				class="mx-auto w-full max-w-md sm:w-80 sm:h-80 object-cover"
				src=""
				alt={name}
				id="food-img"
				style="min-width: 300px;"
				bind:this={resultImage}
			/>
			<p class="absolute bottom-6 text-center left-1/2 -translate-x-1/2" id="description">
				{description}
			</p>
		</div>
		<a class="bnt my-2" href="./">Learn more</a>
	</div>
	<div class="flex my-4">
		<button class="bnt !flex content-center justify-center" on:click={refresh}>
			<p>Refresh</p>
			<svg viewBox="0 0 339 379" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M169.5 306.236C152.396 306.236 136.022 303.122 120.917 297.431C68.9534 277.855 32 227.79 32 169.118C32 93.3898 93.5608 32 169.5 32C245.439 32 307 93.3898 307 169.118C307 203.503 294.308 234.932 273.341 259M169.5 306.236L138.792 232.649M169.5 306.236L93.4167 346"
					stroke="#B8B8B8"
					stroke-width="64"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
</div>
