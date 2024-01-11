<script lang="ts">
	import { Badge } from '$lib/components';
	import type { IRoundTable } from '$lib/types';
	import { getPlayerNameById } from '$lib/utils/player.js';
	import Crown from 'lucide-svelte/icons/crown';
	import * as m from '$paraglide/messages.js';

	export let data: IRoundTable;
	export let tableNum: number;
</script>

<!-- <div class="roundTableCardWrapper"> -->
<button class="roundTableCard" on:click>
	<div class="header">{m.roundTableHeader({ id: tableNum + 1 })}</div>

	<div class="content">
		{#each data.players as player, idx}
			<div class="player">
				<span class="playerPos">{idx + 1}º</span>
				<span class="playerName">
					{getPlayerNameById(player.id)}
				</span>
				<div class="gwIcon">
					{#if player.gw > 0}
						<svelte:component this={Crown} size={20}></svelte:component>
					{/if}
				</div>
				<span class="playerResult">
					<Badge type="pill-color" text={player.vp} />
				</span>
			</div>
		{/each}
	</div>
</button>

<!-- </div> -->

<style lang="scss">
	.roundTableCard {
		border-radius: var(--radius-xl, 12px);
		border: 1px solid var(--color-border-secondary, #eaecf0);
		background: var(--color-bg-primary, #fff);
		max-width: 400px;
		min-width: 300px;
		flex: 1 0 1px;
		overflow: hidden;

		box-shadow: var(--shadow-xs);
		translate: 0 0;
		transition:
			translate 0.3s,
			box-shadow 0.3s;

		cursor: pointer;

		&:hover {
			translate: 0 -3px;
			box-shadow: var(--shadow-md);

			background-color: var(--color-bg-primary_hover);
		}
	}

	.header {
		display: flex;
		padding: var(--spacing-xl) var(--spacing-3xl);
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-md, 8px);
		align-self: stretch;
		border-bottom: 1px solid var(--color-border-secondary);
		background-color: var(--color-bg-brand-solid);
		color: var(--comp-colors-Buttons-Primary-button-primary-fg);

		/* Text md/Semibold */
		font-family: Inter;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: 24px; /* 150% */
	}

	.content {
		display: flex;
		padding: var(--spacing-xl, 24px);
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-md, 8px);
		align-self: stretch;
	}

	.player {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		// border: 1px solid var(--color-border-primary);
		// border-radius: var(--radius-md);
		padding: var(--spacing-md);
		gap: var(--spacing-lg);
		width: 100%;
	}

	.gwIcon {
		width: 20px;
		height: 20px;
		color: var(--color-fg-brand-primary);
	}

	.playerPos {
		color: var(--color-text-tertiary, #475467);

		/* Text sm/Medium */
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 20px; /* 142.857% */
	}

	.playerName {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		font-family: Inter;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 24px; /* 150% */
		color: var(--color-text-primary);
	}

	.playerResult {
		margin-left: auto;
	}
</style>
