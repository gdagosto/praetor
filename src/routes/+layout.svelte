<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import LoginModal from '$lib/components/login-modal/login-modal.svelte';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	{@render children()}

	<LoginModal />
</ParaglideJS>
