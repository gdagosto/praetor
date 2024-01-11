<script lang="ts">
	import { Button, FeaturedIcon, Modal } from '$lib/components/index.js';
	import { stPlayers } from '$lib/stores';
	import User from 'lucide-svelte/icons/user';

	export let showModal: () => void;
	export let id: number = -1;
	let dialog: HTMLDialogElement;

	function onDelete() {
		if (id !== -1) stPlayers.remove(id);
		dialog.close();
	}

	function onKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') onDelete();
	}
</script>

<Modal size="md" bind:showModal bind:dialog on:keypress={onKeyPress}>
	<div class="modalHeader" slot="header">
		<div class="content">
			<FeaturedIcon type="modern" size="md" icon={User} />
			<div class="allText">
				<h2>Deletar usuário</h2>
				<h4>
					Você tem certeza que deseja remover o usuário? Você poderá inseri-lo novamente caso mude
					de ideia.
				</h4>
			</div>
		</div>
	</div>
	<div class="modalContent"></div>
	<div class="modalActions">
		<div class="content">
			<Button hierarchy="secondary-gray" text="Cancel" on:click={() => dialog.close()} />
			<Button hierarchy="primary-destructive" text="Delete" on:click={() => onDelete()} />
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
</style>
