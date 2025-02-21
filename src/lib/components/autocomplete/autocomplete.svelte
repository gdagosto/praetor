<script lang="ts">
	import { isDesktop } from '$lib/utils';
	import AutocompleteMobile from './autocomplete-mobile.svelte';
	import type { IPropsAutocomplete } from './types';



	let { children, autoOpen = false, open = $bindable(autoOpen), ...restProps }: IPropsAutocomplete = $props();
</script>

{#if isDesktop.current}
	<AutocompleteMobile {children} bind:open {...restProps} />
{:else}
	<AutocompleteMobile {children} bind:open {...restProps} />
{/if}
