<script lang="ts">
	import ButtonGroup from '$lib/components/ButtonGroup/ButtonGroup.svelte';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
	import type { IButtonGroupItem } from '$lib/types';

	import Trophy from 'lucide-svelte/icons/trophy';

	const itemText: IButtonGroupItem = {
		text: 'Text'
	};
	const itemTextDisabled: IButtonGroupItem = {
		text: 'Text',
		disabled: true
	};
	const itemTextDot: IButtonGroupItem = {
		text: 'Text',
		icon: 'dot'
	};
	const itemDot: IButtonGroupItem = {
		icon: 'dot'
	};
	const itemIcon: IButtonGroupItem = {
		icon: Trophy
	};
	const itemTextIcon: IButtonGroupItem = {
		text: 'Text',
		icon: Trophy
	};
	const itemTextDotDisabled: IButtonGroupItem = {
		disabled: true,
		text: 'Text',
		icon: 'dot'
	};
	const itemDotDisabled: IButtonGroupItem = {
		disabled: true,
		icon: 'dot'
	};
	const itemIconDisabled: IButtonGroupItem = {
		disabled: true,
		icon: Trophy
	};
	const itemTextIconDisabled: IButtonGroupItem = {
		disabled: true,
		text: 'Text',
		icon: Trophy
	};
</script>

<OverlayScrollbarsComponent style="width: 100%">
	<div class="wrapper">
		<ButtonGroup items={[itemText, itemText, itemTextDisabled, itemText]} />
		<ButtonGroup items={[itemDot, itemTextDot, itemIcon, itemTextIcon]} />
		<ButtonGroup
			items={[itemDotDisabled, itemTextDotDisabled, itemIconDisabled, itemTextIconDisabled]}
		/>

		<ButtonGroup type="color" items={[itemText, itemText, itemTextDisabled, itemText]} />
		<ButtonGroup type="color" items={[itemDot, itemTextDot, itemIcon, itemTextIcon]} />
		<ButtonGroup
			type="color"
			items={[itemDotDisabled, itemTextDotDisabled, itemIconDisabled, itemTextIconDisabled]}
		/>
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
</style>
