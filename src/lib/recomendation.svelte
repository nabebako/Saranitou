<script lang="ts">
	import { onMount } from 'svelte';
	import Slide from './slide.svelte';
	import Loading from './animation/loading.svelte';
	import Help from './help.svelte';

	let id = '';
	let name = '';
	let description = '';
	let src = '';
	let shouldShowLoading = false;

	function animate() {}

	function refresh() {
		const req = new XMLHttpRequest();
		const options = JSON.parse(localStorage.getItem('options')) ?? {};

		req.onload = () => {
			const res = JSON.parse(req.response);
			id = res.id;
			name = res.name;
			description = res.description;
			src = res.image || '/default.svg';
			shouldShowLoading = false;
		};

		shouldShowLoading = true;

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
		const dishIds: string[] = JSON.parse(localStorage.getItem('dish-ids')) ?? [];
		if (dishIds.indexOf(id) === -1) {
			localStorage.setItem('dish-ids', JSON.stringify([...dishIds, id]));
		}
		refresh();
	}

	function skip() {
		// window.alert('disliked!');
		refresh();
	}

	onMount(refresh);
</script>

<div class="rec-container">
	<div class="flex flex-center">
		<div class="side-control relative hidden md:flex flex-center">
			<Help position="-top-1/4">
				<p>Click here to save</p>
			</Help>
			<button class="py-16 px-4 lg:px-12 glass rounded-xl" on:click={save}>
				<svg class="save-icon" viewBox="0 0 240 244" fill="none" xmlns="http://www.w3.org/2000/svg">
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
		<span class="block md:hidden bg-black w-full h-full" />
	</div>
	<div class="relative pt-8">
		<Help position="left-1/2 -translate-x-1/2 translate-y-1/2">
			<p>Swipe left to save</p>
			<p>Swipe right to skip</p>
		</Help>
		{#if shouldShowLoading}
			<div class="grid justify-center items-center p-12 aspect-square">
				<Loading />
			</div>
		{:else}
			<div>
				<div class="relative text-center mb-4">
					<h1 class="title text-center pb-4">{name}</h1>
					<Slide onLeft={save} onRight={skip} slideSpeed={1.2}>
						<img
							class="w-full aspect-square object-cover indicate-moveable"
							{src}
							alt={name}
							draggable="false"
						/>
					</Slide>
					<p class="mt-4 max-w-text text-neutral-700 dark:text-white">
						{description}
					</p>
				</div>
				<div class="my-2 mx-auto w-fit">
					<a class="link-bnt" href="./">
						<p>Learn more</p>
						<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M9.76421 12.8216C9.37368 13.2121 9.37368 13.8453 9.76421 14.2358C10.1547 14.6263 10.7879 14.6263 11.1784 14.2358L9.76421 12.8216ZM22 2H23C23 1.44772 22.5523 1 22 1V2ZM12.4197 6.05737C12.972 6.05737 13.4197 5.60966 13.4197 5.05737C13.4197 4.50509 12.972 4.05737 12.4197 4.05737V6.05737ZM19.9426 11.7921C19.9426 11.2398 19.4949 10.7921 18.9426 10.7921C18.3903 10.7921 17.9426 11.2398 17.9426 11.7921H19.9426ZM13.0204 1C12.4681 1 12.0204 1.44772 12.0204 2C12.0204 2.55228 12.4681 3 13.0204 3V1ZM21 10.9796C21 11.5319 21.4477 11.9796 22 11.9796C22.5523 11.9796 23 11.5319 23 10.9796H21ZM16.9426 21H10.4713V23H16.9426V21ZM10.4713 21H4V23H10.4713V21ZM3 20V13.5287H1V20H3ZM3 13.5287V7.05737H1V13.5287H3ZM11.1784 14.2358L22.7071 2.70711L21.2929 1.29289L9.76421 12.8216L11.1784 14.2358ZM4 6.05737H10.4713V4.05737H4V6.05737ZM10.4713 6.05737H12.4197V4.05737H10.4713V6.05737ZM17.9426 13.5287V20H19.9426V13.5287H17.9426ZM17.9426 11.7921V13.5287H19.9426V11.7921H17.9426ZM22 1H13.0204V3H22V1ZM23 10.9796V2H21V10.9796H23ZM4 21C3.44771 21 3 20.5523 3 20H1C1 21.6569 2.34315 23 4 23V21ZM16.9426 23C18.5995 23 19.9426 21.6569 19.9426 20H17.9426C17.9426 20.5523 17.4949 21 16.9426 21V23ZM3 7.05737C3 6.50509 3.44772 6.05737 4 6.05737V4.05737C2.34315 4.05737 1 5.40052 1 7.05737H3Z"
							/>
						</svg>
					</a>
				</div>
			</div>
		{/if}
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
	<div class="flex flex-center">
		<div class="side-control relative hidden md:flex flex-center">
			<Help position="-top-1/4">
				<p>Click here to skip</p>
			</Help>
			<button class="py-16 px-4 lg:px-12 glass rounded-xl" on:click={skip}>
				<svg class="skip-icon" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="196" y="10" width="18" height="220" rx="9" fill="#E4687C" fill-opacity="0.8" />
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
		<span class="block md:hidden bg-black w-full h-full" />
	</div>
</div>

<style lang="postcss">
	.flex-center {
		@apply items-center justify-center;
	}

	.title {
		@apply text-2xl;
		@apply text-primary-300;
	}

	.rec-container {
		@apply grid;
		justify-items: stretch;
		grid-template-columns: 1fr 20rem 1fr;
	}
	@media screen(md) {
		.rec-container {
			grid-template-columns: minmax(calc(140px + 4rem), 1fr) minmax(20rem, 26rem) minmax(
					calc(140px + 4rem),
					1fr
				);
		}
		.rec-container .side-control svg {
			width: 108px;
			height: 90px;
		}
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

	.link-bnt {
		@apply flex w-fit h-fit py-2 px-3;
		@apply justify-center items-center space-x-1;
		@apply rounded-xl;
		@apply select-none;
		@apply bg-primary-300 text-neutral-100;
		@apply transition-colors ease-out;
	}
	.link-bnt svg {
		@apply fill-neutral-100 stroke-neutral-100;
	}
	.link-bnt:hover {
		@apply cursor-pointer underline;
		@apply bg-secondary-300 text-neutral-600;
	}

	.link-bnt:hover svg {
		@apply fill-neutral-600 stroke-neutral-600;
	}

	@keyframes indicate-moveable {
		0%,
		50%,
		100% {
			transform: translateX(0) rotate(0);
		}
		25% {
			transform: translateX(5%) rotate(2deg);
		}
		75% {
			transform: translateX(-5%) rotate(-2deg);
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
	button:hover > .skip-icon .tri-1 {
		transform: translateX(0);
		@apply opacity-100;
	}
	button:hover > .skip-icon .tri-2 {
		transform: translateX(22%);
		@apply fill-primary-300;
	}
	button:hover > .skip-icon .tri-3 {
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
	button:hover > .save-icon .tri-1 {
		transform: translateY(0);
		@apply opacity-100;
	}
	button:hover > .save-icon .tri-2 {
		transform: translateY(20%);
		@apply fill-primary-300;
	}
	button:hover > .save-icon .tri-3 {
		@apply opacity-0;
	}
</style>
