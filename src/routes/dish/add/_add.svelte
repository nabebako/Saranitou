<script lang="ts">
	import Header from '$lib/header.svelte';
	import Logo from '$lib/logo.svelte';

	import '$css/global.css';

	let form: HTMLFormElement;
	let previewImage: HTMLImageElement;
	let imageFileInput: HTMLInputElement;
	let imageUrlInput: HTMLInputElement;

	let imageFileSize = '';
	let imageUrl = '';
	let imageStatus: 'success' | 'error' | 'no-image' = 'no-image';
	let suggestionTags = [];
	let tags = [];

	function submit() {
		if(!form.hasAttribute('invalid')) {
			let formData = new FormData(form);
			fetch('/api/dish/add',
			{
				method: 'post',
				body: formData,
			}).then((res) => {
				if(res.status === 200) {

				} else {

				}
			});
		}
	}

	function makeInputInvalid(target: HTMLInputElement) {
		target.setAttribute('invalid', '');
		target.form.setAttribute('invalid', '');
	}
	function makeInputValid(target: HTMLInputElement) {
		target.removeAttribute('invalid');
		target.form.removeAttribute('invalid');
	}

	function resetPreviewImage() {
		previewImage.src = '/default.svg';
		previewImage.alt = '';
		imageStatus = 'no-image';
		imageUrl = '';
		imageFileSize = '';
		makeInputValid(imageUrlInput);
	}
	function previewImageError() {
		previewImage.src = '/error.svg';
		previewImage.alt = 'error loading specified image';
		imageStatus = 'error';
		imageFileInput.disabled = false;
		imageFileInput.nextElementSibling.setAttribute('tabindex', '0');
		imageUrlInput.disabled = false;
		makeInputInvalid(imageUrlInput);
	}
	function previewImageSuccess() {
		if (!/error\.svg|default\.svg/.test(previewImage.src)) {
			imageStatus = 'success';
			makeInputValid(imageUrlInput);
		}
	}

	function fetchPreviewImage() {
		const { value } = imageUrlInput;
		if (value) {
			previewImage.src = value;
			previewImage.alt = value;
			imageUrl = previewImage.src;
			imageFileInput.disabled = true;
			imageFileInput.nextElementSibling.removeAttribute('tabindex');
		} else if (imageStatus !== 'success') {
			resetPreviewImage();
		}
	}
	function showImageFile() {
		const fileHandler = new FileReader();
		fileHandler.onload = () => {
			previewImage.src = fileHandler.result as string;
			imageUrlInput.disabled = true;
			imageUrl = imageFileInput.files[0].name;
			imageFileSize = calculateFileSize(imageFileInput.files[0].size);
			imageUrlInput.value = '';
		};
		fileHandler.readAsDataURL(imageFileInput.files[0]);
	}
	function removeImageFile() {
		imageFileInput.value = '';
		imageUrlInput.value = '';
		imageFileInput.disabled = false;
		imageFileInput.nextElementSibling.setAttribute('tabindex', '0');
		imageUrlInput.disabled = false;
		resetPreviewImage();
	}
	function calculateFileSize(bytes: number): string {
		if (bytes < 1024) {
			return `${bytes} bytes`;
		} else if (bytes >= 1024 && bytes < 1048576) {
			return `${(bytes / 1024).toFixed(2)} KB`;
		} else if (bytes >= 1048576) {
			return `${(bytes / 1048576).toFixed(2)} MB`;
		}
	}

	function getTagSuggestion() {
		suggestionTags = ['tag-1', 'tag-2', 'tag-3','tag-4','tag-5','tag-6','tag-7','tag-8'];
	}
</script>

<Header>
	<svelte:fragment slot="left">
		<Logo sizing="small" />
	</svelte:fragment>
</Header>

<main>
	<div class="main-container">
		<form on:submit|preventDefault={submit} bind:this={form}>
			<legend>Add new dish</legend>
			<div class="image-field-grid">
				<div class="w-full space-y-2">
					<div class="text-input">
						<input type="text" name="dish-name" id="dish-name" />
						<label for="dish-name">Name</label>
					</div>
					<div class="text-input">
						<input
							type="url"
							name="image-url"
							id="image-url"
							bind:this={imageUrlInput}
							on:blur={fetchPreviewImage}
							on:keydown|capture={(e) => {
								if(e.key === 'Enter') {
									e.preventDefault();
									fetchPreviewImage();
								}}}
						/>
						<label for="image-url">Image url</label>
					</div>
					<div class="space-2">
						<input
							class="hidden"
							type="file"
							name="image-file"
							id="image-file"
							accept=".png,.jpg,.jpeg"
							bind:this={imageFileInput}
							on:input={showImageFile}
						/>
						<label class="bnt-inline" tabindex="0" for="image-file" on:keydown|capture={(e) => {
							if(e.key === 'Enter') {
								e.preventDefault();
								imageFileInput.click();
							}}}
							>Select image</label
						>
						<button class="bnt-inline" on:click|preventDefault={removeImageFile}
							>Remove Image</button
						>
						<p>{imageUrl} {imageFileSize}</p>
					</div>
					<div class="text-input">
						<textarea name="description" id="dish-description" cols="75" rows="4" />
						<label for="dish-description">Description</label>
					</div>
				</div>
				<div class="w-fit">
					<img
						class="object-cover check-image glass rounded-lg"
						src="/default.svg"
						on:load={previewImageSuccess}
						on:error={previewImageError}
						bind:this={previewImage}
						alt=""
					/>
					<div class="pt-2">
						{#if imageStatus === 'no-image'}
							<p>Add image either by url or upload</p>
						{:else if imageStatus === 'success'}
							<p>Image acceptable</p>
						{:else}
							<p>Image failed to load</p>
						{/if}
					</div>
				</div>
			</div>
			<fieldset class="checkbox-input" name="meal">
				<legend>Meal</legend>
				<div class="checkbox-input">
					<input type="checkbox" name="breakfast" id="meal-breakfast" value="breakfast" />
					<label for="meal-breakfast">Breakfast</label>
				</div>
				<div class="checkbox-input">
					<input type="checkbox" name="lunch" id="meal-lunch" value="lunch" />
					<label for="meal-lunch">Lunch</label>
				</div>
				<div class="checkbox-input">
					<input type="checkbox" name="dinner" id="meal-dinner" value="dinner" />
					<label for="meal-dinner">Dinner</label>
				</div>
			</fieldset>
			<fieldset name="tag">
				<legend>Tags</legend>
				<input type="search" name="tag-search" id="tag-search" on:keydown|capture={(e) => {
					if(e.key === 'Enter') {
						e.preventDefault();
						if(suggestionTags[0]) tags = [...tags, suggestionTags[0]];
					}
				}} />
				<label for="tag-search">
					<button class="bnt-inline" on:click|preventDefault={getTagSuggestion}>Search</button>
					{#each tags as tag}
						<button
							class="bnt-inline"
							on:click|preventDefault={() => {
								tags = tags.filter((val) => val !== tag);
								suggestionTags = [...suggestionTags, tag];
							}}>{tag}</button
						>
					{/each}
				</label>
				<div class="block w-60">
					{#each suggestionTags as suggestionTag}
						<button
							class="bnt-inline mb-1 mr-2"
							on:click|preventDefault={() => {
								tags = [...tags, suggestionTag];
								suggestionTags = suggestionTags.filter((val) => val !== suggestionTag);
							}}>{suggestionTag}</button
						>
					{/each}
				</div>
			</fieldset>
			<div class="mx-auto w-fit">
				<input class="bnt submit-input" type="submit" value="Add" />
			</div>
		</form>
	</div>
</main>

<style lang="postcss">
	.image-field-grid {
		@apply grid gap-4;
		grid-template-columns: auto 400px;
	}

	.check-image {
		height: 300px;
		width: 400px;
	}

	input[name='dish-name'] {
		width: 30ch;
	}
	input[name='image-url'] {
		width: 60ch;
	}
	.text-input input ~ label {
		@apply transition-all;
	}
	.text-input input ~ label::before {
		content: '';
		@apply bg-primary-300 opacity-0;
		@apply transition-opacity;
		transition-delay: 150ms;
	}
	.text-input input:disabled ~ label {
		@apply flex h-fit p-0;
		@apply items-center;
		@apply top-1/2 -translate-y-1/2;
		@apply bg-transparent;
		@apply text-base;
	}
	input[name='image-url']:disabled ~ label::before {
		@apply inline-block h-6 w-6 mr-2;
		@apply rounded-full;
		@apply opacity-100;
	}
	input[name='image-file']:disabled ~ label {
		@apply cursor-not-allowed;
		@apply bg-primary-300 text-white;
	}
	textarea[name='description'] {
		@apply resize-none;
		max-width: 75ch;
		@apply w-full;
	}

	:global(input[invalid]) {
		@apply !border-red-500;
	}

	:global(form[invalid]) .submit-input {
		@apply bg-neutral-300 text-white;
		@apply cursor-not-allowed;
	}
</style>
