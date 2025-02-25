<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { LoginDialog } from '$lib/components/login-dialog/index.js';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	{@render children()}

	<LoginDialog />
</ParaglideJS>
