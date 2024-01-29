<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ComponentType, SvelteComponent } from 'svelte';
	import HelpCircle from 'lucide-svelte/icons/help-circle';
	import Button from '../Button/Button.svelte';

	export let size: 'sm' | 'md' = 'sm';
	export let type: 'default' | 'icon-leading' | 'text-leading' | 'trailing-button' = 'default';
	export let label = '';
	export let hint = '';
	export let placeholder = '';
	export let error = '';
	export let help = '';
	export let addonText = '';
	export let icon: ComponentType<SvelteComponent> | undefined = undefined;
	export let disabled: boolean = false;
	export let ref: HTMLInputElement | undefined = undefined;

	/** Obtem o valor atual do componente */
	export let value: string = '';

	const dispatch = createEventDispatcher();

	function onChange(e: Event) {
		if (!(e.currentTarget instanceof HTMLInputElement)) return;
		dispatch('change', e.currentTarget.value);
	}

	function onInput(e: Event) {
		if (!(e.target instanceof HTMLInputElement)) return;
		value = e.target.value;
	}

	function onKeyPress(e: KeyboardEvent) {
		if (!(e.target instanceof HTMLInputElement)) return;
		if (e.key === 'Enter') {
			value = e.target.value;
			onButtonClick();
		}
	}

	function onButtonClick() {
		dispatch('click-button', value);
	}
</script>

<div class={`textInputWrapper size-${size} type-${type}`} class:destructive={error} class:disabled>
	<div class="inputWithLabel">
		{#if label}
			<span class="label">{label}</span>
		{/if}

		<div class="inputWrapper">
			{#if type === 'text-leading' && addonText}
				<div class="addonLeading">
					{addonText}
				</div>
			{/if}
			<div class="input">
				<div class="content">
					{#if type === 'icon-leading' && icon}
						<div class="iconWrapper">
							<svelte:component this={icon} size={20} />
						</div>
					{/if}

					<input
						bind:this={ref}
						type="text"
						{placeholder}
						on:input={onInput}
						on:change|preventDefault={onChange}
						on:keypress={onKeyPress}
						{value}
						{disabled}
					/>

					{#if help}
						<div class="helpIcon" title={help}><HelpCircle /></div>
					{/if}
				</div>
			</div>

			{#if type === 'trailing-button'}
				<div class="trailingButton">
					<Button
						hierarchy="secondary-gray"
						size="md"
						text={addonText}
						iconLeft={icon}
						on:click={onButtonClick}
					/>
				</div>
			{/if}
		</div>
	</div>
	{#if hint || error}
		<span class="hintText">{error || hint}</span>
	{/if}
</div>

<style lang="scss">
	.textInputWrapper {
		display: flex;
		padding: var(--spacing-none, 0px);
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-sm, 6px);
		flex: 1 0 0;

		--inputPadding: var(--spacing-md, 8px) var(--spacing-lg, 12px);

		&.size-sm {
			--inputPadding: var(--spacing-md, 8px) var(--spacing-lg, 12px);
		}

		&.size-md {
			--inputPadding: 10px 14px;
		}

		&.type-text-leading {
			.input {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
		}

		&.type-trailing-button {
			.inputWrapper {
				align-items: stretch;
			}

			.input {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				border-right-color: transparent;
			}
			.trailingButton {
				display: flex;
				align-items: stretch;
				:global(button) {
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
				}
			}
		}
	}

	.textInputWrapper.disabled {
		.input {
			border: 1px solid var(--color-border-disabled, #d0d5dd);
			background: var(--color-bg-disabled_subtle, #f9fafb);

			.content input {
				color: var(--color-text-disabled);
			}
		}
	}

	.inputWithLabel {
		display: flex;
		padding: var(--spacing-none, 0px);
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-sm, 6px);
		align-self: stretch;
		border-radius: var(--radius-none, 0px);

		.label {
			color: var(--color-text-secondary, #344054);

			/* Text sm/Medium */
			font-family: Inter;
			font-size: 14px;
			font-style: normal;
			font-weight: 500;
			line-height: 20px; /* 142.857% */
		}

		.inputWrapper {
			display: flex;
			align-items: center;
			align-self: stretch;

			.addonLeading {
				display: flex;
				padding: var(--inputPadding);
				align-items: center;
				gap: var(--spacing-none, 0px);

				border-radius: var(--spacing-md, 8px) var(--spacing-none, 0px) var(--spacing-none, 0px)
					var(--spacing-md, 8px);

				border: 1px solid var(--color-border-primary);
				border-right: none;

				color: var(--color-fg-tertiary, #475467);

				/* Text md/Regular */
				font-family: Inter;
				font-size: 16px;
				font-style: normal;
				font-weight: 400;
				line-height: 24px; /* 150% */
			}
		}

		.input {
			display: flex;
			padding: var(--inputPadding);
			align-items: center;
			gap: var(--spacing-md, 8px);
			align-self: stretch;
			flex: 1 0 0;

			border-radius: var(--radius-md, 8px);
			border: 1px solid var(--color-border-primary, #d0d5dd);
			background: var(--color-bg-primary, #fff);

			box-shadow: var(--shadow-xs);

			&:focus-within {
				border: 1px solid var(--color-border-brand, #d6bbfb);
				outline: none;
				z-index: 2;

				/* Focus rings/ring-brand-shadow-xs */
				box-shadow:
					0px 0px 0px 4px rgba(158, 119, 237, 0.24),
					0px 1px 2px 0px rgba(16, 24, 40, 0.05);
			}

			.content {
				display: flex;
				padding: var(--spacing-none, 0px);
				align-items: center;
				gap: var(--spacing-md, 8px);
				flex: 1 0 0;
				border-radius: var(--radius-none, 0px);

				.iconWrapper {
					width: 20px;
					height: 20px;
					color: var(--color-fg-quaternary);
				}

				input {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					flex: 1 0 0;
					border: none;
					background-color: transparent;

					overflow: hidden;
					color: var(--color-text-primary, #101828);
					text-overflow: ellipsis;

					/* Text md/Regular */
					font-family: Inter;
					font-size: 16px;
					font-style: normal;
					font-weight: 400;
					line-height: 24px; /* 150% */

					&::placeholder {
						color: var(--color-text-placeholder, #667085);
					}

					&:focus-visible {
						outline: none;
					}
				}

				.helpIcon {
					display: flex;
					width: 16px;
					height: 16px;
					justify-content: center;
					align-items: center;
					color: var(--color-fg-quinary);
					cursor: help;

					&:hover {
						color: var(--color-fg-quinary_hover);
					}
				}
			}
		}
	}

	.hintText {
		color: var(--color-text-tertiary, #475467);

		/* Text sm/Regular */
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 20px; /* 142.857% */
	}
</style>
