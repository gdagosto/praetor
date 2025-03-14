<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import { stVeknCredentials, stVeknCredentialsInitialValue } from '$lib/stores/vekn.svelte';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import LogOut from '@lucide/svelte/icons/log-out';

	const sidebar = useSidebar();

	const user = $derived({
		name: stVeknCredentials.current.username,
		avatar:
			stVeknCredentials.current.avatarId === 0
				? `https://www.vekn.net/media/kunena/avatars/resized/size200/crypsis/nophoto.png`
				: `https://www.vekn.net/media/kunena/avatars/resized/size200/users/avatar${stVeknCredentials.current.id}.png`,
		avatarFallback: stVeknCredentials.current.username.slice(0, 1).toUpperCase()
	});

	function onerrorAvatar() {
		stVeknCredentials.current.avatarId = 0;
	}

	function onclickLogin() {
		stVeknCredentials.current.isLoggedIn = false;
		sidebar.setOpenMobile(false);
	}

	function onclickLogout() {
		stVeknCredentials.current = structuredClone(stVeknCredentialsInitialValue);
	}
</script>

{#if stVeknCredentials.current.id !== 0}
	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton
							size="lg"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							{...props}
						>
							<Avatar.Root class="h-8 w-8 rounded-lg">
								<Avatar.Image src={user.avatar} alt={user.name} onerror={onerrorAvatar} />
								<Avatar.Fallback class="rounded-lg">{user.avatarFallback}</Avatar.Fallback>
							</Avatar.Root>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">{user.name}</span>
								<!-- <span class="truncate text-xs">{user.email}</span> -->
							</div>
							<ChevronsUpDown class="ml-auto size-4" />
						</Sidebar.MenuButton>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="w-[var(--bits-dropdown-menu-anchor-width)] min-w-56 rounded-lg"
					side={sidebar.isMobile ? 'bottom' : 'right'}
					align="end"
					sideOffset={4}
				>
					<DropdownMenu.Label class="p-0 font-normal">
						<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
							<Avatar.Root class="h-8 w-8 rounded-lg">
								<Avatar.Image src={user.avatar} alt={user.name} onerror={onerrorAvatar} />
								<Avatar.Fallback class="rounded-lg">{user.avatarFallback}</Avatar.Fallback>
							</Avatar.Root>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">{user.name}</span>
								<!-- <span class="truncate text-xs">{user.email}</span> -->
							</div>
						</div>
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<!-- <DropdownMenu.Group>
					<DropdownMenu.Item>
						<Sparkles />
						Upgrade to Pro
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<BadgeCheck />
						Account
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<CreditCard />
						Billing
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<Bell />
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group> -->
					<!-- <DropdownMenu.Separator /> -->
					<DropdownMenu.Group>
						<DropdownMenu.Item onclick={onclickLogout}>
							<LogOut />
							Log out
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
{:else}
	<Button size="sm" onclick={onclickLogin}>Login</Button>
{/if}
