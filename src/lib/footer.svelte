<script lang="ts">
	import IcoGithub from './ico/logo/ico-github.svelte';
</script>

<footer class="w-full text-neutral-100 bg-neutral-700">
	<div class="mx-6 sm:mx-auto sm:w-4/5 py-6">
		<div class="grid grid-flow-col justify-between gap-6">
			<div>
				<ul>
					<li>
						<a href="/about">About</a>
					</li>
				</ul>
			</div>
			<slot />
			<div class="justify-self-end">
				<ul class="flex space-x-3">
					<li>
						<a href="https://github.com/nabebako/Saranitou" target="_blank">
							<IcoGithub />
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
