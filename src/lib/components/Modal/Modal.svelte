<script lang="ts">
	import type { IModalSize } from '$lib/types';
	import { ButtonClose } from '$lib/components';

	export const showModal = () => {
		dialog?.showModal();
		dialog?.focus();
	};

	export let size: IModalSize = 'md';

	export let dialog: HTMLDialogElement | undefined = undefined;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class={`size-${size}`}
	bind:this={dialog}
	on:close
	on:mousedown|self={() => dialog?.close()}
	on:keypress|self
>
	<div class="modal">
		<div class="modalHeader">
			<slot name="header" {dialog} />

			{#if $$slots?.header}
				<div class="btnClose">
					<ButtonClose on:click={() => dialog?.close()} />
				</div>
			{/if}
		</div>
		<slot {dialog} />
	</div>
</dialog>

<style lang="scss">
	dialog {
		padding: var(--spacing-4xl, 32px) var(--container-padding-desktop, 32px);
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		background-color: transparent;
		border: none;
		outline: none;

		&::before {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100dvh;
			z-index: -1;

			content: '';
			background-color: var(--color-bg-overlay);
			opacity: 0.7;
		}

		&::backdrop {
			backdrop-filter: blur(8px);
		}
	}

	.modal {
		// display: flex;
		padding: var(--spacing-none, 0px);
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-none, 0px);
		align-self: stretch;

		border-radius: var(--radius-xl, 12px);
		background: var(--color-bg-primary, #fff);
		color: var(--color-text-primary);

		/* Shadows/shadow-xl */
		box-shadow:
			0px 8px 8px -4px rgba(16, 24, 40, 0.03),
			0px 20px 24px -4px rgba(16, 24, 40, 0.08);

		&.size-xxs {
			max-width: var(--width-xxs, 320px);
		}

		&.size-xs {
			max-width: var(--width-xs, 384px);
		}

		&.size-sm {
			max-width: var(--width-sm, 480px);
		}

		&.size-md {
			max-width: var(--width-md, 560px);
		}

		&.size-lg {
			max-width: var(--width-lg, 640px);
		}

		&.size-xl {
			max-width: var(--width-xl, 768px);
		}

		&.size-2xl {
			max-width: var(--width-2xl, 1024px);
		}
	}

	.modalHeader {
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		align-self: stretch;

		.btnClose {
			position: absolute;
			right: 16px;
			top: 16px;
		}
	}
</style>
