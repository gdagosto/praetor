<script lang="ts">
	import ButtonGroup from '$lib/components/ButtonGroup/ButtonGroup.svelte';
	import { Button, FeaturedIcon, Modal } from '$lib/components/index.js';
	import { stRounds } from '$lib/stores';
	import { RoundTableState, type IButtonGroupItem } from '$lib/types';
	import { getPlayerNameById } from '$lib/utils/player.js';
	import Trophy from 'lucide-svelte/icons/trophy';
	import Crown from 'lucide-svelte/icons/crown';
	import * as m from '$paraglide/messages.js';

	export let showModal: () => void;
	export let idRound: number = -1;
	export let idTable: number = -1;
	let dialog: HTMLDialogElement;

	$: players = structuredClone($stRounds[idRound]?.tables[idTable]?.players);

	function onReport() {
		if (idRound === -1) return;
		if (idTable === -1) return;

		stRounds.updateTable(idRound, idTable, {
			state: RoundTableState.Finished,
			players
		});

		dialog.close();
	}

	function onKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') onReport();
	}

	const buttonsVPs: IButtonGroupItem[] = [
		{
			text: '0',
			value: 0
		},
		{
			text: '½',
			value: 0.5
		},
		{
			text: '1',
			value: 1
		},
		{
			text: '1½',
			value: 1.5
		},
		{
			text: '2',
			value: 2
		},
		{
			text: '2½',
			value: 2.5
		},
		{
			text: '3',
			value: 3
		},
		{
			text: '3½',
			value: 3.5
		},
		{
			text: '4',
			value: 4
		},
		{
			text: '4½',
			value: 4.5
		},
		{
			text: '5',
			value: 5
		}
	];

	function onPlayerVPChange(idx: number, vp: number) {
		players[idx].vp = vp;

		// Update GW and TPs.
		const playerPos = players.map((p, idx) => ({ ...p, idx })).sort((a, b) => b.vp - a.vp);

		players.forEach((p) => {
			p.gw = 0;
			p.tp = 0;
		});

		let tps: number[] = [];
		const tableSize = players.length;
		if (tableSize === 4) tps = [60, 48, 24, 12];
		if (tableSize === 5) tps = [60, 48, 36, 24, 12];

		let lastVP = playerPos[0].vp;
		let lastTP = 0;
		let positionGroups: Array<{ players: number[]; tp: number }> = [];
		let lastPlayers: number[] = [];

		for (let i = 0, iMax = players.length; i < iMax; i++) {
			const player = playerPos[i];
			const tp = tps[i];

			if (lastVP !== player.vp) {
				positionGroups.push({ tp: lastTP, players: structuredClone(lastPlayers) });
				lastTP = 0;
				lastVP = player.vp;
				lastPlayers = [];
			}

			lastTP += tp;
			lastPlayers.push(player.idx);
		}

		positionGroups.push({ tp: lastTP, players: lastPlayers });

		positionGroups.forEach((posGroup) => {
			// For each player in a position group, divide the TPs equally
			const tp = posGroup.tp / posGroup.players.length;
			posGroup.players.forEach((pIdx) => {
				players[pIdx].tp = tp;
			});
		});

		// Update GW (if exists)
		const winner = playerPos[0];
		if (winner.vp < 2) return;
		if (positionGroups[0].players.length > 1) return;
		players[winner.idx].gw = 1;
	}
</script>

<Modal size="xl" bind:showModal bind:dialog on:keypress={onKeyPress}>
	<div class="modalHeader" slot="header">
		<div class="content">
			<FeaturedIcon type="modern" size="md" icon={Trophy} />
			<div class="allText">
				<h2>{m.roundTableHeader({ id: idTable + 1 })} - {m.results()}</h2>
				<h4>{m.tableReportSubtitle()}</h4>
			</div>
		</div>
	</div>
	<div class="modalContent">
		{#each players ?? [] as player, idx}
			{@const playerName = getPlayerNameById(player.id)}
			<div class="player">
				<span class="playerName" title={playerName}>{playerName}</span>
				<div class="gwIcon">
					{#if player.gw > 0}
						<Crown size={20} />
					{/if}
				</div>
				<div class="vps">
					<ButtonGroup
						type="color"
						items={buttonsVPs}
						value={player.vp}
						on:change={({ detail }) => onPlayerVPChange(idx, detail)}
					/>
				</div>
			</div>
		{/each}
	</div>
	<div class="modalActions">
		<div class="content">
			<Button hierarchy="secondary-gray" text={m.cancel()} on:click={() => dialog.close()} />
			<Button hierarchy="primary" text={m.save()} on:click={() => onReport()} />
		</div>
	</div>
</Modal>

<style lang="scss">
	.modalHeader {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-self: stretch;

		.content {
			display: flex;
			padding: var(--spacing-3xl);
			align-items: flex-start;
			gap: var(--spacing-xl, 16px);
			align-self: stretch;
		}

		.allText {
			display: flex;
			padding: var(--spacing-none, 0px);
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-xs, 4px);
			flex: 1 0 0;

			h2 {
				align-self: stretch;
				color: var(--color-text-primary, #101828);

				/* Text lg/Semibold */
				font-family: Inter;
				font-size: 18px;
				font-style: normal;
				font-weight: 600;
				line-height: 28px; /* 155.556% */
			}

			h4 {
				align-self: stretch;
				color: var(--color-text-tertiary, #475467);

				/* Text sm/Regular */
				font-family: Inter;
				font-size: 14px;
				font-style: normal;
				font-weight: 400;
				line-height: 20px; /* 142.857% */
			}
		}
	}

	.modalContent {
		display: flex;
		padding: var(--spacing-none, 0px) var(--spacing-3xl, 24px);
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-2xl, 20px);
		align-self: stretch;

		.player {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			gap: var(--spacing-xl);
			padding: var(--spacing-md);
			width: 100%;
			justify-content: flex-start;
		}

		.gwIcon {
			width: 20px;
			height: 20px;
			color: var(--color-fg-brand-primary);
		}

		.playerName {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			cursor: default;
		}

		.vps {
			margin-left: auto;
		}
	}

	.modalActions {
		display: flex;
		padding-top: var(--spacing-4xl, 32px);
		flex-direction: column;
		align-items: flex-start;
		align-self: stretch;

		.content {
			display: flex;
			padding: var(--spacing-none, 0px) var(--spacing-3xl, 24px) var(--spacing-3xl, 24px)
				var(--spacing-3xl, 24px);
			align-items: flex-start;
			gap: var(--spacing-lg, 12px);
			align-self: stretch;
		}
	}
</style>
