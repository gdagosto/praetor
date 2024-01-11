<script lang="ts">
	import type { INavItem } from '$lib/types';
	import NavItem from './NavItem.svelte';
	import { stCurrentPage } from '$lib/stores';

	export let style: 'simple' | '' = 'simple';

	export let items: INavItem[] = [];

	function onClickNavItem(id: INavItem['id'], cb: INavItem['onClick']) {
		// Set current item to current
		stCurrentPage.set(id);

		if (!cb) return;
		cb();
	}
</script>

<aside class={`sidebarWrapper style-${style}`}>
	<div class="content">
		<div class="mainContent">
			<div class="header"><slot name="header" /></div>
			<div class="navigation">
				{#each items.filter((i) => i.position === 'main' || !i.position) as navItem}
					<NavItem
						dot={navItem.dot}
						icon={navItem.icon}
						text={navItem.text}
						badge={navItem.badge}
						current={$stCurrentPage === navItem.id}
						on:click={() => onClickNavItem(navItem.id, navItem.onClick)}
					/>
				{/each}
			</div>
		</div>
		<div class="footer">
			<div class="navigation">
				{#each items.filter((i) => i.position === 'footer') as navItem}
					<NavItem
						dot={navItem.dot}
						icon={navItem.icon}
						text={navItem.text}
						badge={navItem.badge}
						current={$stCurrentPage === navItem.id}
						on:click={() => onClickNavItem(navItem.id, navItem.onClick)}
					/>
				{/each}
			</div>
		</div>
	</div>
</aside>

<style lang="scss">
	.sidebarWrapper {
		display: flex;
		width: var(--width-xxs);
		padding: var(--spacing-none, 0px);
		align-items: flex-start;
		gap: var(--spacing-none, 0px);
		flex-shrink: 0;

		border-radius: var(--radius-none, 0px);
		border-right: 1px solid var(--color-border-secondary, #eaecf0);
		background: var(--color-bg-primary, #fff);

		color: var(--color-fg-primary);
	}

	.content {
		display: flex;
		padding: var(--spacing-none, 0px);
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		flex: 1 0 0;
		align-self: stretch;

		.mainContent {
			display: flex;
			padding-top: var(--spacing-4xl, 32px);
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-3xl, 24px);
			align-self: stretch;

			.header {
				display: flex;
				padding: var(--spacing-none, 0px) var(--spacing-2xl, 20px) var(--spacing-none, 0px)
					var(--spacing-3xl, 24px);
				flex-direction: column;
				align-items: flex-start;
				gap: var(--spacing-none, 0px);
				align-self: stretch;
			}

			.navigation {
				display: flex;
				padding: var(--spacing-none, 0px) var(--spacing-xl, 16px);
				flex-direction: column;
				align-items: flex-start;
				gap: var(--spacing-xs, 4px);
				align-self: stretch;
			}
		}

		.footer {
			display: flex;
			padding: var(--spacing-none, 0px) var(--spacing-xl, 16px) var(--spacing-4xl, 32px)
				var(--spacing-xl, 16px);
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-3xl, 24px);
			align-self: stretch;

			.navigation {
				display: flex;
				padding: var(--spacing-none, 0px);
				flex-direction: column;
				align-items: flex-start;
				gap: var(--spacing-xs, 4px);
				align-self: stretch;
			}
		}
	}
</style>
