<script lang="ts">
	import { Button, FeaturedIcon, Modal, TextInput } from '$lib/components/index.js';
	import User from 'lucide-svelte/icons/user';
	import Search from 'lucide-svelte/icons/search';
	import { playerDB } from '$lib/vekn';
	import type { IDbPlayer } from '$lib/types';
	import { stPlayers } from '$lib/stores';
	import * as m from '$paraglide/messages.js';

	export const showModal = () => {
		actuallyShowModal();
		setTimeout(() => textInputRef.focus(), 100);
	};
	export let id: number = -1;

	let title: string;
	let subtitle: string;
	let dialog: HTMLDialogElement;
	let textInputRef: HTMLInputElement;
	let actuallyShowModal: () => void;
	let playerData: Partial<IDbPlayer> = {};

	$: prepareModal(id);

	function prepareModal(id: number) {
		// Change title and subtitle
		if (id === -1) {
			title = m.summaryAddPlayerHeaderTitle();
			subtitle = m.summaryAddPlayerHeaderSubtitle();
			playerData = {};
			return;
		}
		title = m.summaryEditPlayerHeaderTitle();
		subtitle = m.summaryEditPlayerHeaderSubtitle();

		// Load player data if id is not -1
		playerData = $stPlayers[id];
	}

	function updateData(e: CustomEvent, key: keyof IDbPlayer) {
		if (key === 'id' || key === 'ratingConstructed' || key === 'ratingLimited') {
			playerData[key] = parseInt(e.detail);
		} else {
			playerData[key] = e.detail;
		}
	}

	async function onSearch(e: CustomEvent) {
		const playerId = parseInt(e.detail);
		const dbData = await playerDB.getPlayerDataByID(playerId ?? 0);
		if (!dbData) {
			playerData = { id: playerId };
			return;
		}
		playerData = dbData;
		dialog.focus();
	}

	function onSave() {
		if (!playerData.id) throw new Error('Player id is missing');
		if (!playerData.firstName) throw new Error('Player first name is missing');
		if (!playerData.lastName) throw new Error('Player last name is missing');

		if (id === -1) {
			stPlayers.add(playerData.id, playerData.firstName, playerData.lastName);
		} else {
			stPlayers.updatePlayer(id, {
				id: playerData.id,
				firstName: playerData.firstName,
				lastName: playerData.lastName
			});
		}

		dialog.close();
	}

	function onKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') onSave();
	}
</script>

<Modal bind:showModal={actuallyShowModal} bind:dialog on:keypress={onKeyPress}>
	<div class="modalHeader" slot="header">
		<div class="content">
			<FeaturedIcon type="modern" size="md" icon={User} />
			<div class="allText">
				<h2>{title}</h2>
				<h4>{subtitle}</h4>
			</div>
		</div>
	</div>
	<div class="modalContent">
		<div class="row">
			<TextInput
				bind:ref={textInputRef}
				label="Vekn ID"
				hint={m.summaryEditPlayerFieldVeknHint()}
				type="trailing-button"
				addonText={m.summaryEditPlayerFieldVeknSearchButton()}
				icon={Search}
				on:change={(e) => updateData(e, 'id')}
				on:click-button={onSearch}
				value={playerData?.id?.toString() ?? ''}
			/>
		</div>

		<div class="row">
			<TextInput
				label={m.summaryEditPlayerFieldNameLabel()}
				type="default"
				on:change={(e) => updateData(e, 'firstName')}
				value={playerData?.firstName ?? ''}
			/>
		</div>
		<div class="row">
			<TextInput
				label={m.summaryEditPlayerFieldSurnameLabel()}
				type="default"
				on:change={(e) => updateData(e, 'lastName')}
				value={playerData?.lastName ?? ''}
			/>
		</div>
	</div>
	<div class="modalActions">
		<div class="content">
			<Button hierarchy="secondary-gray" text={m.cancel()} on:click={() => dialog.close()} />
			<Button hierarchy="primary" text={m.save()} on:click={() => onSave()} />
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
		align-items: flex-start;
		gap: var(--spacing-2xl, 20px);
		align-self: stretch;
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

	.row {
		display: flex;
		gap: var(--spacing-lg);
		width: 100%;
	}
</style>
