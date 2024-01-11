<script lang="ts">
	import { Button } from '$lib/components/Button/index.js';
	import { stDarkMode } from '$lib/stores';
	import MoonStar from 'lucide-svelte/icons/moon-star';
	import Sun from 'lucide-svelte/icons/sun';

	function onClickThemeToggle() {
		stDarkMode.set(!$stDarkMode);
	}
</script>

<div class="headerNavigationWrapper">
	<div class="container">
		<div class="content">
			<Button hierarchy="link-gray" text="Home"></Button>
		</div>
		<div class="content">
			<div class="actions">
				<Button
					iconLeft={$stDarkMode ? Sun : MoonStar}
					iconOnly
					hierarchy="tertiary-color"
					on:click={onClickThemeToggle}
				/>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.headerNavigationWrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-self: stretch;
		border-bottom: 1px solid var(--color-border-secondary, #eaecf0);
		background: var(--color-bg-primary, #fff);
		color: var(--color-text-secondary);
	}

	.container {
		display: flex;
		height: 72px;
		max-width: var(--container-max-width-desktop, 1280px);
		padding: var(--spacing-none, 0px) var(--container-padding-desktop, 32px);
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.content {
		display: flex;
		padding: var(--spacing-none, 0px);
		align-items: center;
		gap: var(--spacing-xl, 16px);
	}

	.actions {
		display: flex;
		padding: var(--spacing-none, 0px);
		align-items: flex-start;
		gap: var(--spacing-xs, 4px);
	}
</style>
