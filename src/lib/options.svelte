<script lang="ts">
	import { onMount } from 'svelte';

	export let options = {};
	let isOptionOpen = false;

	function saveOptions() {
		document
			.querySelector('form')
			.querySelectorAll('input')
			.forEach((input) => {
				options[input.name] = {
					value: input.value,
					checked: input?.checked ?? true
				};
			});
		localStorage.setItem('options', JSON.stringify(options));
		isOptionOpen = false;
	}
	function loadOptions() {
		Object.keys(options).forEach((key) => {
			const input: HTMLInputElement = document.querySelector(`input[name=${key}]`);
			if (input.type === 'text') {
				input.value = options[key].value;
			}
			input.checked = options[key].checked;
		});
	}

	onMount(() => {
		options = JSON.parse(localStorage.getItem('options')) ?? {};
		loadOptions();
	});
</script>

<div class="mx-auto">
	<button
		class="bnt"
		on:click={() => {
			isOptionOpen = !isOptionOpen;
		}}
	>
		{#if !isOptionOpen}
			<p>Options</p>
		{:else}
			<p>Close Options</p>
		{/if}
	</button>
</div>

<div
	class="fixed left-1/2 -translate-x-1/2 transition-all duration-700 options-container rounded-xl p-4 !m-0 z-10 {isOptionOpen
		? 'translate-y-1/2 bottom-1/2 block'
		: 'bottom-0 opacity-0 invisible'}"
>
	<form on:submit|preventDefault={saveOptions}>
		<fieldset name="time">
			<legend>Time</legend>
			<input type="checkbox" name="breakfast" id="breakfast" value="breakfast" />
			<label for="breakfast">Breakfast</label>
			<input type="checkbox" name="lunch" id="lunch" value="lunch" />
			<label for="lunch">Lunch</label>
			<input type="checkbox" name="dinner" id="dinner" value="dinner" />
			<label for="dinner">Dinner</label>
		</fieldset>
		<input class="bnt" type="submit" name="submit" value="Save & exit" />
	</form>
</div>
