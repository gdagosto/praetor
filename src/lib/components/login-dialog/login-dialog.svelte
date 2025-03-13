<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import { cn, isDesktop, veknApi, veknLogin } from '$lib/utils';
	import { stVeknCredentials } from '$lib/stores/vekn.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let open = $state(!stVeknCredentials.current.isLoggedIn);
	let openBefore = !stVeknCredentials.current.isLoggedIn;

	$effect(() => {
		openBefore = !stVeknCredentials.current.isLoggedIn;
		open = !stVeknCredentials.current.isLoggedIn;
	});

	$effect(() => {
		if (open !== openBefore) {
			stVeknCredentials.current.isLoggedIn = !open;
			openBefore = open;
		}
	});

	function onLogin() {
		veknLogin();
	}
</script>

{#if isDesktop.current}
	<Dialog.Root bind:open>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{@render title()}</Dialog.Title>
				<Dialog.Description>
					{@render description()}
				</Dialog.Description>
			</Dialog.Header>
			{@render content()}
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open autoFocus={false}>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>{@render title()}</Drawer.Title>
				<Drawer.Description>
					{@render description()}
				</Drawer.Description>
			</Drawer.Header>

			{@render content(true)}
			<Drawer.Footer class="pt-4"></Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}

{#snippet title()}
	{m.login_dialog_title()}
{/snippet}

{#snippet description()}
	{m.login_dialog_description()}
{/snippet}

{#snippet content(drawer = false)}
	<form class={cn('grid items-start gap-4', drawer && 'px-4')}>
		<Label for="login-dialog-username">{m.login_dialog_username_label()}</Label>
		<Input
			id="login-dialog-username"
			placeholder={m.login_dialog_username_placeholder()}
			tabindex={1}
			bind:value={stVeknCredentials.current.username}
		/>
		<Label for="login-dialog-password">{m.login_dialog_password_label()}</Label>
		<Input
			id="login-dialog-password"
			placeholder={m.login_dialog_password_placeholder()}
			tabindex={2}
			type="password"
			bind:value={stVeknCredentials.current.password}
		/>

		<Button onclick={onLogin} type='submit'>{m.login_dialog_confirm()}</Button>
		{#if drawer}
			<Drawer.Close class={buttonVariants({ variant: 'secondary' })}
				>{m.drawer_cancel()}</Drawer.Close
			>
		{/if}
	</form>
{/snippet}
