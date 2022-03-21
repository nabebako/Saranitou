<script lang="ts">
	import { onMount } from 'svelte';

	let optionForm: HTMLFormElement;
	let displaySave: HTMLDivElement;
	let isOptionOpen = false;

	function saveOptions() {
		const options = {};
		new FormData(optionForm).forEach((val, key) => {
			options[key] = val;
		});
		localStorage.setItem('options', JSON.stringify(options));
		isOptionOpen = false;

		//  play save animation
		displaySave.classList.remove('hidden');

		setTimeout(() => {
			displaySave.classList.add('hidden');
		}, 1500);
	}
	function loadOptions() {
		const options = JSON.parse(localStorage.getItem('options')) ?? {};
		optionForm.querySelectorAll('input').forEach((input) => {
			if (input.type === 'checkbox') {
				input.checked = options[input.name] ? true : false;
			} else if (input.type === 'text') {
				input.value = options[input.name] ?? '';
			}
		});
	}

	onMount(() => loadOptions());
</script>

<div class="mx-auto hidden lg:block">
	<button
		class="bnt"
		on:click={() => {
			loadOptions();
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

<div class="absolute top-0 left-1/2 -translate-y-1/2 z-10 hidden" bind:this={displaySave}>
	<p>Saved!</p>
</div>

<div class="options-container bg-light-bg dark:bg-dark-bg lg:border lg:w-1/2 lg:border-border" is-open={isOptionOpen}>
	<form
		id="option-form"
		class="option-gird"
		on:submit|preventDefault={saveOptions}
		bind:this={optionForm}
	>
		<fieldset class="collapsible" name="meal">
			<legend>
				<button
					on:click|preventDefault={function() {
						this.focus();
					}}>Meal
					<!-- icon indicating collapse -->
				</button>
			</legend>
			<ul>
				<li class="checkbox-input">
					<input
						type="checkbox"
						name="breakfast"
						id="breakfast"
						value="breakfast"
						on:click={function () {
							this.focus();
						}}
					/>
					<label for="breakfast"> Breakfast </label>
				</li>
				<li class="checkbox-input">
					<input
						type="checkbox"
						name="lunch"
						id="lunch"
						value="lunch"
						on:click={function () {
							this.focus();
						}}
					/>
					<label for="lunch"> Lunch </label>
				</li>
				<li class="checkbox-input">
					<input
						type="checkbox"
						name="dinner"
						id="dinner"
						value="dinner"
						on:click={function () {
							this.focus();
						}}
					/>
					<label for="dinner"> Dinner </label>
				</li>
			</ul>
		</fieldset>
		<fieldset class="collapsible" name="tag-setting">
			<legend><button on:click|preventDefault={function() {this.focus();}}>Tags</button></legend>
			<ul>
				<li class="text-input">
					<input type="text" name="tags" id="tags-input">
					<label for="tags">Tags</label>
				</li>
			</ul>
		</fieldset>
		<input class="bnt h-fit" type="submit" name="submit" value="Save" />
	</form>
</div>

<style lang="postcss">
	.option-gird {
		@apply grid gap-4;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		grid-template-rows: repeat(auto-fill, fit-content);
	}
	
	.option-gird > :last-child {
		grid-column: 1 / -1;
	}

	.collapsible > :first-child {
		@apply w-full;
	}
	.collapsible > :first-child * {
		@apply w-full;
		@apply text-left;
	}
	.collapsible > :last-child {
		@apply lg:!max-h-fit;
		@apply max-h-0 overflow-hidden;
		@apply transition-all duration-500;
	}
	.collapsible:focus-within > :last-child {
		@apply max-h-full;
	}

	.checkbox-input {
		@apply flex items-center space-x-2;
		@apply w-full;
	}

	.checkbox-input input {
		@apply appearance-none;
		@apply grid;
		@apply w-4 h-4;
		@apply m-0;
		@apply bg-transparent;
		@apply border-2 rounded-full border-border;
		@apply flex-shrink-0;
	}
	.checkbox-input input:checked {
		@apply border-0;
	}
	.checkbox-input input::before {
		content: '';
		@apply block;
		@apply w-full h-full;
		@apply rounded-full;
		box-shadow: inset 1rem 1rem  hsl(295 6% 35%);
		@apply transition-transform duration-75;
		@apply scale-0;
	}
	.dark .checkbox-input input::before {
		box-shadow: inset 1rem 1rem hsl(350 69% 76%);
	}
	.checkbox-input input:checked::before {
		@apply scale-100;
	}

	.checkbox-input label {
		@apply block;
		@apply w-full pl-2;
		@apply select-none;
		@apply text-light-body dark:text-dark-body;
		@apply transition-colors;
	}
	.checkbox-input label:hover {
		@apply cursor-pointer;
		@apply bg-bnt-hover-bg;
		@apply text-bnt-hover-body;
	}
	.checkbox-input input:checked ~ label {
		@apply bg-bnt-light-bg dark:bg-bnt-dark-bg;
		@apply text-bnt-light-body dark:text-bnt-dark-body;
	}

	.text-input {
		@apply relative;
		@apply border-t-8 border-transparent;
	}

	.text-input input {
		@apply w-full p-2;
		@apply bg-transparent appearance-none;
		@apply text-light-body dark:text-dark-body;
		@apply border-2 rounded border-light-body dark:border-dark-body;
		@apply transition-colors;
	}
	.text-input input:hover {
		@apply outline-none;
		@apply border-highlight;
	}
	.text-input input:focus {
		@apply outline-none;
		@apply border-bnt-light-body;
	}

	.text-input label {
		@apply absolute left-3 top-0 -translate-y-1/2 z-20;
		@apply block w-fit h-4 px-1;
		@apply text-light-body dark:text-dark-body;
		@apply bg-light-bg dark:bg-dark-bg;
		font-size: .75rem;
		transition-property: color;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    	transition-duration: 150ms;
	}
	.text-input input:focus ~ label {
		@apply text-bnt-light-body;
	}

	@media screen(lg) {
		.options-container {
			@apply hidden;
			@apply fixed left-1/2 bottom-0 -translate-x-1/2 z-10;
			@apply p-4 !m-0 rounded-xl;
		}
		.options-container[is-open='true'] {
			@apply block;
			@apply bottom-1/2 -translate-x-1/2 translate-y-1/2;
		}
	}
</style>
