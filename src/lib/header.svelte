<script lang="ts">
	import Sidebar from "./sidebar.svelte";
	import Logo from "./logo.svelte";
	import Theme from "./theme.svelte";
	import Help from "./help.svelte";
</script>

<header class="bg-neutral-700">
	<div class="py-4 lg:pt-8 lg:pb-6 mx-4 lg:mx-auto lg:w-4/5 lg:px-0">
		<div class="header-grid h-10">
			<div class="left">
				<slot name="left">
					<div class="w-10 flex items-center justify-center">
						<Sidebar/>
					</div>
				</slot>
			</div>
			<div class="center">
				<slot name="center">	
					<Logo/>
				</slot>
			</div>
			<div class="right">
				<slot class="right">
					<div class="flex space-x-2">
						<Theme />
						<Help />
					</div>
				</slot>
			</div>
		</div>
	</div>
</header>

<style lang="postcss">
	.header-grid {
		@apply grid items-center gap-x-4;
		grid-template-columns: repeat(3, 1fr);
	}
	.left {
		justify-self: start;
	}
	.center {
		justify-self: center;
	}
	.right {
		justify-self: end;
	}
</style>
