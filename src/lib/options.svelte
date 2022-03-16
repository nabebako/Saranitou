<script lang="ts">
	import { onMount } from 'svelte';

	let optionForm: HTMLFormElement;
	let isOptionOpen = false;

	function saveOptions() {
		const options = {};
		new FormData(optionForm).forEach((val, key) => {
			options[key] = val;
		});
		localStorage.setItem('options', JSON.stringify(options));
		isOptionOpen = false;

		window.alert('Option Saved!');
	}
	function loadOptions() {
		const options = JSON.parse(localStorage.getItem('options')) ?? {};
		optionForm.querySelectorAll('input').forEach((input) => {
			if(input.type === 'checkbox') {
				input.checked = options[input.name]? true : false;
			}
			else if(input.type === 'text') {
				input.value = options[input.name];
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

<div class="options-container popup lg:border lg:border-border" is-open={isOptionOpen}>
	<form id="option-form" class="option-gird" on:submit|preventDefault={saveOptions} bind:this={optionForm}>
		<fieldset class="options-section" name="time">
			<legend>
				<button on:click|preventDefault={function() {this.focus();}}>Time</button>
			</legend>
			<ul class="mt-1">
				<li class="checkbox-input">
					<input type="checkbox" name="breakfast" id="breakfast" value="breakfast" on:click={function() {this.focus()}}/>
					<label for="breakfast">
						Breakfast
					</label>
				</li>
				<li class="checkbox-input">
					<input type="checkbox" name="lunch" id="lunch" value="lunch" on:click={function() {this.focus()}}/>
					<label for="lunch" >
						Lunch
					</label>
				</li>
				<li class="checkbox-input">
					<input type="checkbox" name="dinner" id="dinner" value="dinner" on:click={function() {this.focus()}}/>
					<label for="dinner">
						Dinner
					</label>
				</li>
			</ul>
		</fieldset>
		<input class="bnt h-fit" type="submit" name="submit" value="Save" />
	</form>
</div>

<style lang="postcss">
	.option-gird {
		@apply grid grid-flow-col;
		grid-template: repeat(auto-fill, minmax(fit-content, 1fr)) / repeat(
				auto-fill,
				minmax(fit-content, 1fr)
			);
		@apply gap-2;
	}

	.options-section > :first-child {
		@apply w-full;
	}
	.options-section > :first-child * {
		@apply w-full;
		@apply text-left;
	}
	.options-section > :last-child {
		@apply max-h-0 overflow-hidden;
		@apply transition-all duration-500;
	}
	.options-section:focus-within > :last-child {
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
		content: "";
		@apply block;
		@apply w-full h-full;
		@apply rounded-full;
		box-shadow: inset 1rem 1rem hsl(350 69% 76%);
		@apply transition-transform duration-75;
		@apply scale-0;
	}
	.checkbox-input input:checked::before {
		@apply scale-100;
	}
	.checkbox-input label {
		@apply block;
		@apply w-full;
		@apply select-none;
		@apply transition-colors;
		@apply text-light-body dark:text-dark-body;
	}
	.checkbox-input label:hover {
		@apply cursor-pointer;
		@apply bg-bnt-hover-bg;
		@apply text-bnt-hover-body;
	}
	.checkbox-input input:checked ~ label {
		@apply bg-bnt-bg;
		@apply text-bnt-hover-body;
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
