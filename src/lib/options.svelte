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

<div class="options-container text-light-body dark:text-dark-body" is-open={isOptionOpen}>
	<form id="option-form" class="option-gird" on:submit|preventDefault={saveOptions} bind:this={optionForm}>
		<fieldset class="drop-down" name="time">
			<legend><button on:click|preventDefault={function() {this.focus();}}>Time</button></legend>
			<ul class="pt-1">
				<li class="checkbox-input">
					<input type="checkbox" name="breakfast" id="breakfast" value="breakfast" on:click={function() {this.focus()}}/>
					<label for="breakfast" on:click={function() {this.focus()}}>
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
					<input type="checkbox" name="dinner" id="dinner" value="dinner" />
					<label for="dinner" on:click={function() {this.focus()}} >
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
	
	.drop-down > :last-child {
		@apply max-h-0 overflow-hidden;
		@apply transition-all duration-500;
	}
	.drop-down:focus-within > :last-child {
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
		@apply bg-light-background;
		@apply border-2 rounded-full border-light-border;
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
		box-shadow: inset 1rem 1rem cornflowerblue;
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
		@apply hover:cursor-pointer hover:bg-dark-button-color;
	}
	.checkbox-input input:checked ~ label {
		background-color: cornflowerblue;
		@apply text-light-body;
	}
	/* .checkbox-input label img,
	.checkbox-input label svg {
		@apply h-6;
	} */

	@media screen(lg) {
		.options-container {
			@apply hidden;
			@apply fixed left-1/2 bottom-0 -translate-x-1/2 z-10;
			@apply p-4 !m-0 rounded-xl;
			@apply bg-button-bg text-button-text;
		}
		.options-container[is-open='true'] {
			@apply block;
			@apply bottom-1/2 -translate-x-1/2 translate-y-1/2;
		}
	}
</style>
