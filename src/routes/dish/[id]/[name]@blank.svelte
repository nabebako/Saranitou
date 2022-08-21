<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async function ({ params, fetch }) {
		const { id } = params;
		const dish = await fetch('/api/database', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: `["${id}"]`
		})
			.then((res) => res.json() as Promise<APIDatabase>)
			.then((body) => body[0]);
		return {
			props: { dish }
		};
	};

	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import IcoSkip from '$lib/ico/ico-skip.svelte';
	import Footer from '$lib/footer.svelte';
	import Header from '$lib/header.svelte';
	import IcoSave from '$lib/ico/ico-save.svelte';

	export let dish: DocumentDish;

	let showContent = false;
	let rgbHero = { r: 0, g: 0, b: 0 };
	let next: DocumentDish;

	onMount(() => {
		window.addEventListener('wheel', (ev) => {
			if (ev.deltaY > 0) showContent = true;
		});

		window.addEventListener('scroll', () => {
			if (window.scrollY === 0) showContent = false;
		});

		let seen = JSON.parse(localStorage.getItem('seen') || '[]') as string[];
		seen.push(dish.id);

		let url = new URL(window.origin + '/api/recomendation');
		url.searchParams.set('seen', JSON.stringify(seen));

		fetch(url)
			.then((res) => res.json() as Promise<APIRecomendationsResponse>)
			.then((body) => {
				next = body.recomendations[0];
			})
			.catch((err) => {
				console.log(err);
			});
	});

	function save() {
		let saved: string[] = JSON.parse(localStorage.getItem('saved') || '[]');
		if (saved.indexOf(dish.id) == -1) {
			saved = [...saved, dish.id];
			localStorage.setItem('saved', JSON.stringify(saved));
		}
	}

	function skip() {
		window.location.assign(new URL(window.origin + '/dish/' + next.id + '/' + next.urlName));
	}
</script>

<link
	href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Montserrat:wght@200;400&display=swap"
	rel="stylesheet"
/>

<div
	class="fixed z-10 top-0 w-full {showContent
		? 'translate-y-0'
		: '-translate-y-full'} transition-transform duration-500 overflow-hidden}"
>
	<Header />
</div>

<div
	class="flex items-center justify-around w-full h-screen object-cover bg-no-repeat bg-clip-content bg-cover bg-center bg-black"
	style="background-image: linear-gradient(rgba({rgbHero.r}, {rgbHero.g}, {rgbHero.b}, 0.4), rgba({rgbHero.r}, {rgbHero.g}, {rgbHero.b}, 0.4)), url({dish.image});"
>
	<div class="side-control-div opacity-40 grayscale p-32">
		<button class="p-2" on:click={save}>
			<IcoSave height={64} width={null} />
		</button>
	</div>
	<p class="text-center title text-white">{dish.name.en}</p>
	<div class="side-control-div opacity-40 grayscale p-32">
		<button class="p-2" on:click={skip}>
			<IcoSkip height={64} width={null} />
		</button>
	</div>
</div>

{#if showContent}
	<div class="max-w-[60ch] mx-auto text-2xl my-16">
		<section>
			<p class="mb-4">🕛 2 hours 40 minutes</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eius fugiat
				provident distinctio aliquam minus veritatis architecto excepturi ab optio, neque
				cum quisquam ducimus deserunt laboriosam doloribus recusandae nobis nihil?
			</p>
		</section>
		<section>
			<h2 class="mb-2">Ingredients</h2>
			<ul>
				<li>Shit</li>
				<li>Crap</li>
				<li>Wood</li>
				<li>Socks</li>
				<li>RAM</li>
				<li>CPU</li>
				<li>Copium</li>
				<li>Alcohol</li>
				<li>Mercury</li>
			</ul>
		</section>
		<section>
			<h2 class="mb-2">Instructions</h2>
			<h3 class="mb-1">To Make Pickled Lotus Root & Ginger</h3>
			<ul>
				<li>Gather all the ingredients.</li>
				<li>
					Combine rice vinegar, sugar, and kosher salt in a small saucepan. Bring it to a
					boil and let the sugar dissolved completely. Set aside to cool.
				</li>
				<li>
					Peel and cut the ginger into julienne strips (thinner the better). Peel the
					lotus root and cut out the edge to make a flower shape (Read my Hana Renkon
					tutorial).
				</li>
				<li>
					Slice the lotus root into ⅛ inch (3 mm) and soak in vinegar water (add 1 tsp
					rice vinegar to the water) for 5 minutes to prevent it from turning brown.
				</li>
				<li>
					Boil water in a small saucepan and blanch the ginger and lotus root for 3
					minutes. Drain well and transfer them to the vinegar mixture to marinate. You
					can make this ahead and keep it up to 1 week in the refrigerator.
				</li>
			</ul>
		</section>
	</div>
	<Footer />
{/if}

<style lang="postcss">
	.title {
		font-family: 'Montserrat', sans-serif;
		font-weight: 200;
		font-size: 8rem;
		font-variant: small-caps;
		letter-spacing: 0.08em;
	}

	p,
	ul,
	li,
	h3 {
		font-family: 'Cormorant Garamond', serif;
	}
	li {
		list-style-type: disc;
		list-style-position: inside;
		margin-left: 2ch;
	}
	h2 {
		font-family: 'Montserrat', sans-serif;
		@apply text-primary-300;
		font-size: 2rem;
		letter-spacing: 0.02em;
		font-variant: small-caps;
	}

	section {
		@apply mb-12;
	}

	.side-control-div {
		@apply transition-all;
		@apply duration-500 ease-out;
	}

	.side-control-div:hover {
		@apply grayscale-0 opacity-100;
	}
</style>
