<script lang="ts">
	import { onMount } from 'svelte';

	let name = '';
	let description = '';
	export let options = {};

	function refresh() {
		const req = new XMLHttpRequest();
		req.onload = () => {
			const res = JSON.parse(req.response);
			name = res.name;
			description = res.description;
		};
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
		options = JSON.parse(localStorage.getItem('options')) ?? {};
	});
</script>

<div class="rec mx-auto w-fit">
	{#if name === '' && description === ''}
		<div class="mx-auto text-center pb-4">
			<p class="text-xl">Welcome to the application</p>
			<p class="text-base">Hit the button below to get a food recomendation.</p>
		</div>
	{:else}
		<p id="title" class="text-center">{name}</p>
		<div class="relative text-center">
			<img class="mx-auto w-96" src="" alt={name} id="food-img" style="min-height: 300px;" />
			<p class="absolute bottom-6 text-center left-1/2 -translate-x-1/2" id="description">
				{description}
			</p>
		</div>
		<button class="bnt my-2">
			<p>Learn more</p>
		</button>
	{/if}
	<div class="flex mb-4">
		<button class="bnt !flex content-center justify-center" on:click={refresh}>
			<p>Hit me up!</p>
			<img class="max-h-6" src="/favicon.png" alt="refresh" />
		</button>
	</div>
</div>
