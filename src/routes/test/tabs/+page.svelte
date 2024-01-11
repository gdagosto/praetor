<script lang="ts">
	import { Tabs } from '$lib/components/index.js';
	import type { ITabItem } from '$lib/types';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';

	const tabItems: ITabItem[] = [
		{
			id: 'r1',
			text: 'SomeText 1',
			onClick: () => console.log('r1')
		},
		{
			id: 'r2',
			text: 'SomeText 2',
			onClick: () => console.log('r2')
		},
		{
			id: 'r3',
			text: 'SomeText 3',
			onClick: () => console.log('r3')
		},
		{
			id: 'r4',
			text: 'SomeText 4',
			onClick: () => console.log('r4')
		},
		{
			id: 'r5',
			text: 'SomeText 5',
			onClick: () => console.log('r5')
		}
	];
</script>

<OverlayScrollbarsComponent style="width: 100%">
	<div class="wrapper">
		<Tabs type="button-primary" size="sm" items={tabItems} />
		<Tabs type="button-primary" size="sm" items={tabItems} fullWidth />
		<Tabs type="button-primary" size="md" items={tabItems} />
		<Tabs type="button-primary" size="md" items={tabItems} fullWidth />
		<hr />
		<Tabs type="button-gray" size="sm" items={tabItems} />
		<Tabs type="button-gray" size="sm" items={tabItems} fullWidth />
		<Tabs type="button-gray" size="md" items={tabItems} />
		<Tabs type="button-gray" size="md" items={tabItems} fullWidth />
		<hr />
		<Tabs type="underline" size="sm" items={tabItems} />
		<Tabs type="underline" size="sm" items={tabItems} fullWidth />
		<Tabs type="underline" size="md" items={tabItems} />
		<Tabs type="underline" size="md" items={tabItems} fullWidth />
		<hr />
		<Tabs type="underline-filled" size="sm" items={tabItems} />
		<Tabs type="underline-filled" size="sm" items={tabItems} fullWidth />
		<Tabs type="underline-filled" size="md" items={tabItems} />
		<Tabs type="underline-filled" size="md" items={tabItems} fullWidth />
		<hr />
		<Tabs type="button-white-border" size="sm" items={tabItems} />
		<Tabs type="button-white-border" size="sm" items={tabItems} fullWidth />
		<Tabs type="button-white-border" size="md" items={tabItems} />
		<Tabs type="button-white-border" size="md" items={tabItems} fullWidth />
	</div>
</OverlayScrollbarsComponent>

<style lang="scss">
	.wrapper {
		display: flex;
		padding: 32px var(--spacing-lg) var(--spacing-6xl, 48px) var(--spacing-lg);
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 32px;
		flex: 1 0 0;
		color: var(--color-text-primary);
	}

	hr {
		width: 90%;
		background-color: var(--color-bg-quaternary);
		height: 1px;
		border: 0;
	}
</style>
