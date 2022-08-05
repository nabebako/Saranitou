<script lang="ts">
	import { onMount } from 'svelte';

	import Slide from '$lib/slide/slider.svelte';
	import Loading from '$lib/animation/loading.svelte';
	import Help from '$lib/help.svelte';
	import ActionBar from './action-bar.svelte';

	let dish = {
		id: '',
		name: {
			en: '',
			jp: ''
		},
		description: '',
		image: '',
		ingredients: [],
		urlName: ''
	} as DocumentDish;
	let src = '';

	let x: number;

	let shouldShowLoading = true;

	function animate() {}

	function refresh() {
		const params = new Map<string, string>();
		const currentTime = new Date().toTimeString().match(/[0-9]{1,2}:[0-9]{2}:[0-9]{2}/)[0];
		const options = localStorage.getItem('options');
		const excludes = localStorage.getItem('seen-dishes');

		params.set('time', currentTime.toString());
		if (options) params.set('options', options);
		if (excludes) params.set('excludes', excludes.replace(/[\[\]\"\']/g, ''));

		let url = new URL(document.URL);
		url.pathname = '/api/recomendation';

		params.forEach((value, key) => url.searchParams.set(key, value));

		shouldShowLoading = true;
		animate();

		fetch(url.toString())
			.then(async (res) => {
				if (res.status !== 200) throw new Error(await res.text());
				return res.json();
			})
			.then((body: APIRecomendationsResponse) => {
				if (body.recomendations[0]) {
					dish = body.recomendations[0];
					const srcBefore = src;
					src = body.recomendations[0].image || '/default.svg';
					if (srcBefore === src) shouldShowLoading = false;
					let seenDishes = (JSON.parse(localStorage.getItem('seen-dishes')) ??
						[]) as string[];
					localStorage.setItem(
						'seen-dishes',
						JSON.stringify([...seenDishes, body.recomendations[0].id])
					);
				}
				if (body.amountAvailable <= 1) localStorage.removeItem('seen-dishes');
			})
			.catch((err) => {});
	}

	function save() {
		const dishIds: string[] = JSON.parse(localStorage.getItem('dish-ids')) ?? [];
		if (dishIds.indexOf(dish.id) === -1) {
			localStorage.setItem('dish-ids', JSON.stringify([...dishIds, dish.id]));
		}
		refresh();
	}

	function skip() {
		refresh();
	}

	onMount(refresh);
</script>

<div class="h-full">
	<div class="rec-container">
		<div class="flex flex-center">
			<div class="side-control relative hidden lg:flex flex-center">
				<Help position="-top-1/4">
					<p>Click here to save</p>
				</Help>
				<button class="py-16 px-4 lg:px-12 box-shadow-sm rounded-xl" on:click={save}>
					<svg
						class="save-icon animate"
						viewBox="0 0 240 244"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M17 139V184.5V230H119H221V184.5V139"
							stroke="#E4687C"
							stroke-opacity="0.8"
							stroke-width="16"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							class="tri-3"
							d="M127.753 174.483C123.751 179.395 116.249 179.395 112.247 174.483L33.6992 78.066C28.377 71.5331 33.0257 61.75 41.4521 61.75L198.548 61.75C206.974 61.75 211.623 71.5331 206.301 78.066L127.753 174.483Z"
							fill="#E4687C"
							fill-opacity="0.8"
						/>
						<path
							class="tri-2"
							d="M127.753 122.483C123.751 127.395 116.249 127.395 112.247 122.483L33.6992 26.066C28.377 19.5331 33.0257 9.75 41.4521 9.75L198.548 9.75C206.974 9.75 211.623 19.5331 206.301 26.066L127.753 122.483Z"
							fill="#EC96A4"
							fill-opacity="0.8"
						/>
						<path
							class="tri-1"
							d="M127.753 122.483C123.751 127.395 116.249 127.395 112.247 122.483L33.6992 26.066C28.377 19.5331 33.0257 9.75 41.4521 9.75L198.548 9.75C206.974 9.75 211.623 19.5331 206.301 26.066L127.753 122.483Z"
							fill="#DFE166"
							fill-opacity="0.8"
						/>
					</svg>
				</button>
			</div>
			<span
				class="absolute block lg:hidden bg-green-400 w-12 h-full left-0 top-0"
				style="opacity: calc({-x / 200});"
			/>
		</div>
		<div class="relative py-8">
			<Help position="left-1/2 -translate-x-1/2 translate-y-1/2">
				<p>Swipe left to save</p>
				<p>Swipe right to skip</p>
			</Help>
			{#if shouldShowLoading}
				<div
					class="grid justify-center items-center p-12 aspect-square glass rounded-lg font-handwriting"
				>
					<Loading />
				</div>
			{/if}
			<div class={shouldShowLoading ? 'hidden' : 'block'}>
				<Slide onLeft={save} onRight={skip} slideSpeed={1.2} bind:x>
					<div
						class="relative w-full aspect-square glass rounded-lg overflow-hidden text-white indicate-moveable"
					>
						<img
							class="absolute top-0 w-full aspect-square object-cover"
							{src}
							alt={dish.name.en}
							draggable="false"
							on:load={() => (shouldShowLoading = false)}
						/>
						<div class="overlay">
							<h1 class="py-4 text-2xl text-center font-handwriting">
								{dish.name.en}
							</h1>
						</div>
						<div class="overlay w-full px-2 py-1 !absolute bottom-0">
							<p class="h-12 overflow-hidden font-handwriting">
								{dish.description}
							</p>
						</div>
					</div>
				</Slide>
			</div>
		</div>
		<div class="flex flex-center">
			<div class="side-control relative hidden lg:flex flex-center">
				<Help position="-top-1/4">
					<p>Click here to skip</p>
				</Help>
				<button class="py-16 px-4 lg:px-12 box-shadow-sm rounded-xl" on:click={skip}>
					<svg
						class="skip-icon animate"
						viewBox="0 0 240 240"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="196"
							y="10"
							width="18"
							height="220"
							rx="9"
							fill="#E4687C"
							fill-opacity="0.8"
						/>
						<path
							class="tri-3"
							d="M192.483 112.247C197.395 116.249 197.395 123.751 192.483 127.753L96.066 206.301C89.5331 211.623 79.75 206.974 79.75 198.548L79.75 41.4521C79.75 33.0257 89.5331 28.377 96.066 33.6992L192.483 112.247Z"
							fill="#E4687C"
							fill-opacity="0.8"
						/>
						<path
							class="tri-2"
							d="M140.483 112.247C145.395 116.249 145.395 123.751 140.483 127.753L44.066 206.301C37.5331 211.623 27.75 206.974 27.75 198.548L27.75 41.4521C27.75 33.0257 37.5331 28.377 44.066 33.6992L140.483 112.247Z"
							fill="#EC96A4"
							fill-opacity="0.8"
						/>
						<path
							class="tri-1"
							d="M140.483 112.247C145.395 116.249 145.395 123.751 140.483 127.753L44.066 206.301C37.5331 211.623 27.75 206.974 27.75 198.548L27.75 41.4521C27.75 33.0257 37.5331 28.377 44.066 33.6992L140.483 112.247Z"
							fill="#DFE166"
							fill-opacity="0.8"
						/>
					</svg>
				</button>
			</div>
			<span
				class="absolute block lg:hidden bg-red-400 w-12 h-full right-0 top-0"
				style="opacity: calc({x / 200});"
			/>
		</div>
	</div>
	<div class="absolute bottom-0 left-1/2 -translate-x-1/2">
		<ActionBar {refresh} {save} {skip} {dish} {shouldShowLoading} />
	</div>
</div>

<style lang="postcss">
	.flex-center {
		@apply items-center justify-center;
	}

	.rec-container {
		@apply grid;
		justify-items: stretch;
		grid-template-columns: 1fr 20rem 1fr;
	}
	@media screen(lg) {
		.rec-container {
			grid-template-columns: minmax(calc(240px + 4rem), 1fr) minmax(26rem, 30rem) minmax(
					calc(240px + 4rem),
					1fr
				);
		}
		.rec-container .side-control svg {
			width: 144px;
			height: 120px;
		}
	}

	@keyframes indicate-moveable {
		0%,
		50%,
		100% {
			transform: translateX(0) rotate(0);
		}
		25% {
			transform: translateX(2%) rotate(0.5deg);
		}
		75% {
			transform: translateX(-2%) rotate(-0.5deg);
		}
	}
	.indicate-moveable:hover {
		animation-duration: 300ms;
		animation-name: indicate-moveable;
		animation-iteration-count: 1;
		animation-direction: alternate;
	}

	.skip-icon {
		@apply overflow-visible;
	}
	.skip-icon .tri-1,
	.skip-icon .tri-2,
	.skip-icon .tri-3 {
		@apply transition-all duration-300;
	}
	.skip-icon .tri-1 {
		transform: translateX(-60%);
		@apply opacity-0;
	}
	button:hover > .skip-icon.animate .tri-1 {
		transform: translateX(0);
		@apply opacity-100;
	}
	button:hover > .skip-icon.animate .tri-2 {
		transform: translateX(22%);
		@apply fill-primary-300;
	}
	button:hover > .skip-icon.animate .tri-3 {
		transform: translateX(60%);
		@apply opacity-0;
	}

	.save-icon {
		@apply overflow-visible;
	}
	.save-icon .tri-1,
	.save-icon .tri-2,
	.save-icon .tri-3 {
		@apply transition-all duration-300;
	}
	.save-icon .tri-1 {
		transform: translateY(-60%);
		@apply opacity-0;
	}
	button:hover > .save-icon.animate .tri-1 {
		transform: translateY(0);
		@apply opacity-100;
	}
	button:hover > .save-icon.animate .tri-2 {
		transform: translateY(20%);
		@apply fill-primary-300;
	}
	button:hover > .save-icon.animate .tri-3 {
		@apply opacity-0;
	}
</style>
