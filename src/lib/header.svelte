<header class="bg-neutral-700">
	<div class="py-4 lg:pt-8 lg:pb-6 mx-4 lg:mx-auto lg:w-4/5 lg:px-0">
		<div class="header-grid h-10">
			<div class="left">
				<slot name="left"/>
			</div>
			<div class="center">
				<slot name="center"/>
			</div>
			<div class="right">
				<slot name="right"/>
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
