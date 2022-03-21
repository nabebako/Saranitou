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

	class Slideable {
		target: HTMLElement;
		shouldMove: boolean;
		x: number;
		startX: number;

		constructor(target: HTMLElement) {
			this.target = target;
			this.shouldMove = false;
			this.x = 0;
			this.startX = 0;

			this.target.addEventListener('mousedown', () => {
				this.target.classList.remove('transition-transform');
				this.shouldMove = true;
			});
			this.target.addEventListener('touchstart', (e) => {
				this.target.classList.remove('transition-transform');
				this.startX = e.touches.item(0).pageX;
				this.shouldMove = true;
			});
			window.addEventListener('mousemove', (e) => {
				if(this.shouldMove) {
					this.x += e.movementX;
					this.target.style.transform = `translate(${this.x}px) rotate(${this.x * 0.04}deg)`;
				}
				if(this.x > this.target.offsetWidth * 0.75) {
					like();
					this.target.style.transform = 'translate(0px) rotate(0deg)';
					this.x = 0;
					this.shouldMove = false;
				}
				else if(this.x < this.target.offsetWidth * -0.75) {
					dislike();
					this.target.style.transform = 'translate(0px) rotate(0deg)';
					this.x = 0;
					this.shouldMove = false;
				}
			});
			window.addEventListener('touchmove', (e) => {
				if(this.shouldMove) {
					this.x = e.targetTouches.item(0).clientX - this.startX;
					this.target.style.transform = `translate(${this.x}px) rotate(${this.x * 0.04}deg)`;
				}
				if(this.x > this.target.offsetWidth * 0.4) {
					like();
					this.target.style.transform = 'translate(0px) rotate(0deg)';
					this.x = 0;
					this.shouldMove = false;
				}
				else if(this.x < this.target.offsetWidth * -0.4) {
					dislike();
					this.target.style.transform = 'translate(0px) rotate(0deg)';
					this.x = 0;
					this.shouldMove = false;
				}
			});
			window.addEventListener('mouseup', () => {
				this.x = 0;
				this.target.classList.add('transition-transform');
				this.target.style.transform = 'translate(0px) rotate(0deg)';
  				this.shouldMove = false;
  			});
			window.addEventListener('touchend', () => {
				this.x = 0;
				this.target.classList.add('transition-transform');
				this.target.style.transform = 'translate(0px) rotate(0deg)';
				this.shouldMove = false;
			});
		}
	}
	function like() {
		// window.alert('liked!');
		const likedList: string[] = JSON.parse(localStorage.getItem('like-list')) ?? [];
		if(likedList.indexOf(name) === -1) {
			localStorage.setItem('like-list', JSON.stringify([...likedList, name]));
		}
		refresh();
	}
	function dislike() {
		// window.alert('disliked!');
		refresh();
	}

	onMount(() => {
		resultImage.addEventListener('load', () => {
			resultContainer.classList.remove('hidden');
			loddingAnimation.classList.add('hidden');
		});
		new Slideable(resultContainer);
	});
</script>

<div class="rec-container">
	<div class="swiper" on:click={like}>
		<p>save</p>
		<svg width="24" height="24">

		</svg>
	</div>
	<div class="pt-8">
		<div class="text-center pb-4" bind:this={introduction}>
			<h1 class="text-xl text-title font-semi-bold">Welcome</h1>
			<p class="text-base">Hit the button below to get a food recomendation.</p>
		</div>
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
				<h1 class="title text-center pb-4">{name}</h1>
				<img
					class="mx-auto w-full object-cover moveable"
					src=""
					alt={name}
					id="food-img"
					draggable="false"
					bind:this={resultImage}
				/>
				<p class="absolute bottom-6 text-center left-1/2 -translate-x-1/2" id="description">
					{description}
				</p>
			</div>
			<div class="my-2 mx-auto w-fit">
				<a class="link-bnt" href="./">
					<p>Learn more</p>
					<svg width="24" height="24"></svg>
				</a>
			</div>
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
	<div class="swiper" on:click={dislike}>
		<p>move on</p>
	</div>
</div>

<style lang="postcss">
	.title {
		@apply text-2xl;
		@apply text-light-title;
	}
	:global(.dark) .title {
		@apply text-dark-title;
	}

	.rec-container {
		@apply grid max-w-sm;
		@apply mx-auto;
		justify-items: stretch;
	}
	@media screen(md) {
		.rec-container {
			@apply max-w-none mx-0;
			grid-template-columns: 1fr 36rem 1fr;
		}
	}

	.link-bnt {
		@apply flex w-fit h-fit py-2 px-3;
		@apply rounded-xl;
		@apply select-none;
		@apply bg-bnt-light-bg;
		@apply text-bnt-light-body;
		@apply transition-colors ease-out;
	}
	:global(.dark) .link-bnt {
		@apply bg-bnt-dark-bg;
		@apply text-bnt-dark-body;
	}
	.link-bnt:hover {
		@apply cursor-pointer underline;
		@apply bg-bnt-hover-bg text-bnt-hover-body;
	}

	.swiper {
		@apply hidden;
		background-color: hsl(240, 12%, 80%);
	}
	:global(.dark) .swiper {
		background-color: hsl(295, 6%, 50%);
	}
	@media screen(md) {
		.swiper {
			@apply flex items-center justify-center;;
		}
	}

	/* img max-w-md sm:w-80 sm:h-80  */
</style>