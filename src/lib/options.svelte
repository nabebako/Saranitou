<script lang="ts">
	import { onMount } from 'svelte';

	let optionForm: HTMLFormElement;
	let displaySave: HTMLDivElement;

	function saveOptions() {
		const options = {};
		new FormData(optionForm).forEach((val, key) => {
			options[key] = val;
		});
		localStorage.setItem('options', JSON.stringify(options));

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

	onMount(loadOptions);
</script>

<div class="center-using-absolute z-30 hidden w-24 h-12 bg-neutral-700" bind:this={displaySave}>
	<p>Saved!</p>
</div>

<div>
	<form id="option-form" on:submit|preventDefault={saveOptions} bind:this={optionForm}>
		<div class="option-gird">
			<fieldset class="collapsible" name="meal">
				<legend>
					<button
						on:click|preventDefault={function () {
							this.focus();
						}}
						>Meal
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
				<legend
					><button
						on:click|preventDefault={function () {
							this.focus();
						}}>Tags</button
					></legend
				>
				<ul>
					<li class="text-input">
						<input type="text" name="tags" id="tags-input" />
						<label for="tags">Tags</label>
					</li>
				</ul>
			</fieldset>
		</div>
		<input class="bnt h-fit mx-auto" type="submit" name="submit" value="Save" />
	</form>
</div>

<style lang="postcss">
	.option-gird {
		@apply grid gap-4;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
	}

	/* .option-gird > :last-child {
		grid-column: 1 / -1;
	} */

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
		@apply border-2 rounded-full border-neutral-300;
		@apply flex-shrink-0;
	}
	.checkbox-input input:hover {
		@apply border-primary-200;
	}
	.checkbox-input input:checked {
		@apply border-0;
	}
	.checkbox-input input::before {
		content: '';
		@apply block;
		@apply w-full h-full;
		@apply rounded-full;
		box-shadow: inset 1rem 1rem hsl(350, 70%, 65%);
		@apply transition-transform duration-75;
		@apply scale-0;
	}
	.checkbox-input input:checked::before {
		@apply scale-100;
	}

	.checkbox-input label {
		@apply block;
		@apply w-full pl-2;
		@apply select-none;
		@apply text-neutral-700 dark:text-neutral-100;
		@apply transition-colors;
	}
	.checkbox-input label:hover {
		@apply cursor-pointer;
		@apply text-primary-200;
	}
	.checkbox-input input:checked ~ label {
		@apply text-primary-300;
	}

	.text-input {
		@apply relative;
		@apply border-t-8 border-transparent;
	}
	.text-input input {
		@apply w-full p-2;
		@apply bg-transparent appearance-none;
		@apply text-neutral-600 dark:text-neutral-100;
		@apply border-2 rounded border-neutral-600 dark:border-neutral-100;
		@apply transition-colors;
	}
	.text-input input:hover {
		@apply outline-none;
		@apply border-primary-200;
	}
	.text-input input:focus {
		@apply outline-none;
		@apply border-primary-300;
	}

	.text-input label {
		@apply absolute left-3 top-0 -translate-y-1/2 z-20;
		@apply block w-fit h-4 px-1;
		@apply text-neutral-600 dark:text-neutral-100;
		@apply bg-neutral-100 dark:bg-neutral-600;
		font-size: 0.75rem;
		transition-property: color;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
	.text-input input:focus ~ label {
		@apply text-primary-300;
	}
</style>
