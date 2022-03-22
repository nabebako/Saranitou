<script lang="ts">
	import { onMount } from 'svelte';

	let name = '';
	let description = '';
	let loddingAnimation: HTMLDivElement;
	let resultImage: HTMLImageElement;
	let resultContainer: HTMLDivElement;

	function animate() {}
	function refresh() {
		const req = new XMLHttpRequest();
		const options = JSON.parse(localStorage.getItem('options')) ?? {};

		req.onload = () => {
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

	function save() {
		const likedList: string[] = JSON.parse(localStorage.getItem('like-list')) ?? [];
		if (likedList.indexOf(name) === -1) {
			localStorage.setItem('like-list', JSON.stringify([...likedList, name]));
		}
		refresh();
	}
	function skip() {
		// window.alert('disliked!');
		refresh();
	}

	function createSlideable(target: HTMLElement) {
		let shouldMove = false;
		let x = 0;
		let startX = 0;
		target.addEventListener('mousedown', () => {
			target.classList.remove('transition-transform');
			shouldMove = true;
		});
		target.addEventListener('touchstart', (e) => {
			target.classList.remove('transition-transform');
			startX = e.touches.item(0).pageX;
			shouldMove = true;
		});
		window.addEventListener('mousemove', (e) => {
			if (shouldMove) {
				x += e.movementX;
				target.style.transform = `translate(${x}px) rotate(${x * 0.04}deg)`;
			}
			if (x > target.offsetWidth * 0.75) {
				skip();
				target.style.transform = 'translate(0px) rotate(0deg)';
				x = 0;
				shouldMove = false;
			} else if (x < target.offsetWidth * -0.75) {
				save();
				target.style.transform = 'translate(0px) rotate(0deg)';
				x = 0;
				shouldMove = false;
			}
		});
		window.addEventListener('touchmove', (e) => {
			if (shouldMove) {
				x = e.targetTouches.item(0).clientX - startX;
				target.style.transform = `translate(${x}px) rotate(${x * 0.04}deg)`;
			}
			if (x > target.offsetWidth * 0.75) {
				skip();

				target.style.transform = 'translate(0px) rotate(0deg)';
				x = 0;
				shouldMove = false;
			} else if (x < target.offsetWidth * -0.75) {
				save();
				target.style.transform = 'translate(0px) rotate(0deg)';
				x = 0;
				shouldMove = false;
			}
		});
		window.addEventListener('mouseup', () => {
			x = 0;
			target.classList.add('transition-transform');
			target.style.transform = 'translate(0px) rotate(0deg)';
			shouldMove = false;
		});
		window.addEventListener('touchend', () => {
			x = 0;
			target.classList.add('transition-transform');
			target.style.transform = 'translate(0px) rotate(0deg)';
			shouldMove = false;
		});
	}

	onMount(() => {
		refresh();
		resultImage.addEventListener('load', () => {
			resultContainer.classList.remove('hidden');
			loddingAnimation.classList.add('hidden');
		});
		createSlideable(resultContainer);
	});
</script>

<div class="rec-container">
	<div class="swiper" on:click={skip}>
		<p>Skip</p>
	</div>
	<div class="pt-8">
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
				<h1 class="title text-center pb-4 select-none">{name}</h1>
				<img
					class="mx-auto w-full object-cover moveable"
					src=""
					alt={name}
					id="food-img"
					draggable="false"
					bind:this={resultImage}
				/>
				<p class="absolute bottom-6 text-center left-1/2 -translate-x-1/2 text-neutral-100 select-none" id="description">
					{description}
				</p>
			</div>
		</div>
		<div class="my-2 mx-auto w-fit">
			<a class="link-bnt" href="./">
				<p>Learn more</p>
				<svg width="24" height="24" />
			</a>
		</div>
		<div class="my-4 mx-auto w-fit">
			<button class="bnt !flex" on:click={refresh}>
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
	<div class="swiper" on:click={save}>
		<p>Save</p>
		<svg width="24" height="24" />
	</div>
</div>

<style lang="postcss">
	.title {
		@apply text-2xl;
		@apply text-primary-300;
	}

	.rec-container {
		@apply grid;
		grid-template-columns: 2.5rem 1fr 2.5rem;
		justify-items: stretch;
	}
	@media screen(md) {
		.rec-container {
			grid-template-columns: 1fr 36rem 1fr;
		}
	}

	.link-bnt {
		@apply flex w-fit h-fit py-2 px-3;
		@apply rounded-xl;
		@apply select-none;
		@apply bg-primary-300;
		@apply text-neutral-100;
		@apply transition-colors ease-out;
	}
	.link-bnt:hover {
		@apply cursor-pointer underline;
		@apply bg-secondary-300 text-neutral-600;
	}

	.swiper {
		@apply flex items-center justify-center;
		/* box-shadow: inset 0 0 0 1px #fff; */
	}
	.swiper:hover {
		@apply cursor-pointer;
	}
	/* img max-w-md sm:w-80 sm:h-80  */
</style>
