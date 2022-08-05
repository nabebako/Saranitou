<script lang="ts">
	import IcoSaranitouMd from './ico/logo/ico-saranitou-md.svelte';
	import IcoSaranitouSm from './ico/logo/ico-saranitou-sm.svelte';

	export let sizing: 'small' | 'standard' | 'adaptive' = 'adaptive';
</script>

{#if sizing === 'small'}
	<a class="w-fit block justify-self-center" href="/">
		<IcoSaranitouSm height={32} width={32} />
	</a>
{:else if sizing === 'standard'}
	<a class="w-fit block justify-self-center space-x-1" href="/">
		<IcoSaranitouMd height={32} width={null} />
	</a>
{:else}
	<a class="w-fit block justify-self-center space-x-1" href="/">
		<IcoSaranitouMd height={32} width={null} />
	</a>
{/if}
