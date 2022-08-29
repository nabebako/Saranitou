<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const prerender = true;

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
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import IcoSkip from '$lib/ico/ico-skip.svelte';
	import IcoSave from '$lib/ico/ico-save.svelte';
	import IcoSymlink from '$lib/ico/ico-link.svelte';
	import IcoBookmark from '$lib/ico/ico-bookmark.svelte';
	import IcoSearch from '$lib/ico/ico-search.svelte';
	import IcoSaranitouSm from '$lib/ico/logo/ico-saranitou-sm.svelte';
	import IcoGithub from '$lib/ico/logo/ico-github.svelte';
	import Theme from '../../../lib/theme.svelte';

	export let dish: DocumentDish;

	let next: DocumentDish;

	const icoSize = 64;
	const icoSm = 36;

	onMount(() => {
		let seen = JSON.parse(localStorage.getItem('seen') || '[]') as string[];
		seen.push(dish.id);

		let url = new URL(window.origin + '/api/recomendation');
		url.searchParams.set('seen', JSON.stringify(seen));

		fetch(url)
			.then((res) => res.json() as Promise<APIRecomendationsResponse>)
			.then((body) => {
				if (body.amountAvailable <= 1) localStorage.setItem('seen', '[]');
				next = body.recomendations[0];
			})
			.catch((err) => {
				console.log(err);
			});

		localStorage.setItem('seen', JSON.stringify(seen));
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

<header class="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw]">
	<div class="flex w-full py-4 justify-between">
		<div>
			<a class="block p-2 interactive" href="/">
				<IcoSaranitouSm width={icoSm} height={icoSm} />
			</a>
		</div>
		<div class="flex">
			<a class="block p-2 interactive" href="/save">
				<IcoBookmark width={icoSm} height={icoSm} />
			</a>
			<a class="block p-2 interactive" href="/search">
				<IcoSearch width={icoSm} height={icoSm} />
			</a>
			<div class="p-2 interactive">
				<Theme iconSize={icoSm} />
			</div>
		</div>
	</div>
</header>

<div
	class="flex items-center justify-around w-full h-[calc(var(--vh)*100)] object-cover bg-no-repeat bg-clip-content bg-cover bg-center bg-black"
	style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url({dish.image});"
>
	<div>
		<h1 class="text-center title text-white">{dish.name.en}</h1>
		<div class="flex gap-32 pt-4 justify-center">
			<button class="p-6 interactive" on:click={save}>
				<IcoSave height={icoSize} width={icoSize} />
			</button>
			<a class="block p-6 interactive" href="https://www.google.com" target="_blank">
				<IcoSymlink height={icoSize} width={icoSize} />
			</a>
			<a
				class="block p-6 interactive"
				href={next ? `/dish/${next.id}/${next.urlName}` : 'javascript:void(0)'}
			>
				<IcoSkip height={icoSize} width={icoSize} />
			</a>
		</div>
	</div>
</div>

<div class="absolute bottom-6 right-6">
	<a class="block p-2 interactive" href="https://github.com/nabebako/Saranitou" target="_blank">
		<IcoGithub width={icoSm} height={icoSm} />
	</a>
</div>

<style lang="postcss">
	.title {
		font-family: 'Montserrat', sans-serif;
		font-weight: 200;
		font-size: 8rem;
		font-variant: small-caps;
		letter-spacing: 0.08em;
	}

	.interactive {
		@apply grayscale hover:grayscale-0;
		@apply opacity-50 hover:opacity-100;
		@apply transition-all duration-500 ease-out;
	}
</style>
