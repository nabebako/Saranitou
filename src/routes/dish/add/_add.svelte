<script lang="ts">
	import Header from '$lib/header.svelte';
	import Logo from '$lib/logo.svelte';

	import '$css/layout.css';
	import '$css/theme.css';

	let form: HTMLFormElement;
	let checkImage: HTMLImageElement;

	function submit() {
		let formData = new FormData(form);
		const request = new XMLHttpRequest();
		request.open("POST", "/dish/add");
		request.send(formData);
	}
	function checkImageUrl(e: Event) {
		const value = e.target['value'];
		if(value) {
			checkImage.src = value;
			checkImage.alt = value;
		} else {
			
		}
	}
	function checkImageUrlError() {
		checkImage.src = '/default.svg';
		checkImage.alt = 'error loading specified image';
	}

	function handleKeyDown(e: KeyboardEvent) {
		if(e.key === 'Enter') {
			e.preventDefault();
			checkImageUrl(e);
		}
	}
</script>

<Header>
	<svelte:fragment slot="left">
		<Logo sizing='small'/>
	</svelte:fragment>
</Header>

<main>
	<div class="main-container">
		<form on:submit|preventDefault={submit} bind:this={form}>
			<legend>Add new dish</legend>
			<fieldset class="text-input">
				<input type="text" name="dish-name" id="dish-name">
				<label for="dish-name">Name</label>
			</fieldset>
			<fieldset class="text-input">
				<input type="text" name="dish-description" id="dish-description">
				<label for="dish-description">Description</label>
			</fieldset>
			<img class="object-cover w-96 h-72" on:error={checkImageUrlError} bind:this={checkImage} alt="testing">
			<fieldset class="text-input">
				<input type="url" name="dish-image-url" id="dish-image-url" on:blur={checkImageUrl} on:keydown|capture={handleKeyDown}>
				<label for="dish-description">Image url</label>
			</fieldset>
			<fieldset class="checkbox-input" name="ingredients">
				<input type="checkbox" name="asdf" id="asf" value="asdf">
				<label for="asf">What the heck</label>
			</fieldset>
			<!-- <input type="image" src="" alt=""> -->
			<input class="bnt" type="submit" value="Add">
		</form>
	</div>
</main>

<style lang="postcss">
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