<script lang="ts">
	import { onMount } from 'svelte';

	export let options = {};
	let isOptionOpen = false;

	function saveOptions() {
		document
			.querySelector('form')
			.querySelectorAll('input')
			.forEach((input) => {
				if(input.type !== 'submit') {
					options[input.name] = {
						value: input.value,
						checked: input?.checked ?? true
					};
				}
			});
		localStorage.setItem('options', JSON.stringify(options));
		isOptionOpen = false;
	}

	function loadOptions() {
		Object.keys(options).forEach((key) => {
			const input: HTMLInputElement = document.querySelector(`input#${key}`);
			const label: HTMLLabelElement = document.querySelector(`label[for=${key}]`);

			if(input.type === 'text') {
				input.value = options[key].value;
			}
			if(options[key].checked) {
				label.setAttribute('checked', '');
			}
			input.checked = options[key].checked;
		});
	}

	onMount(() => {
		options = JSON.parse(localStorage.getItem('options')) ?? {};
		loadOptions();
		document.querySelectorAll('label').forEach((label) => {
			label.addEventListener('click', () => {
				label.toggleAttribute('checked');
			});
		});
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
			<p>Cancel</p>
		{/if}
	</button>
</div>

<div
	class="fixed left-1/2 -translate-x-1/2 transition-all duration-700 options-container rounded-xl p-4 !m-0 z-10 {isOptionOpen
		? 'translate-y-1/2 bottom-1/2 block'
		: 'bottom-0 opacity-0 invisible'}"
>
	<form on:submit|preventDefault={saveOptions}>
		<fieldset class="pb-2" name="time">
			<legend class="pb-2">Time</legend>
			<input class="hidden" type="checkbox" name="breakfast" id='breakfast' value="breakfast" />
			<label for="breakfast" class="tick-box">Breakfast</label>
			<input class="hidden" type="checkbox" name="lunch" id="lunch" value="lunch" />
			<label class="tick-box" for="lunch">Lunch</label>
			<input class="hidden" type="checkbox" name="dinner" id="dinner" value="dinner" />
			<label class="tick-box" for="dinner">Dinner</label>
		</fieldset>
		<input class="bnt" type="submit" name="submit" value="Save & exit" />
	</form>
</div>
