<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { BackgroundPatternDecorative, Button, FeaturedIcon } from '$lib/components';
	import Lightbulb from 'lucide-svelte/icons/lightbulb';
	import { fly } from 'svelte/transition';
	import type { Writable } from 'svelte/store';
	import * as m from '$paraglide/messages.js';

	export let stHasOutro: Writable<boolean>;

	const dispatch = createEventDispatcher();

	function onClickImport() {
		dispatch('import');
	}
	function onClickGenerate() {
		dispatch('generate');
	}

	onMount(() => {
		stHasOutro.set(true);
	});
</script>

<div class="emptyRound">
	<div class="emptyState">
		<div class="content">
			<div class="featuredIconBg">
				<FeaturedIcon size="xl" icon={Lightbulb} type="modern" />
			</div>
			<div class="bg">
				<BackgroundPatternDecorative
					type="grid"
					size="md"
					style="position: absolute; translate: -50% -50%"
				/>
			</div>
			<div class="allText" out:fly={{ delay: 50, duration: 500, y: 20 }} on:outroend>
				<h2>{m.emptyRoundTitle()}</h2>
				<h4>{m.emptyRoundSubtitle()}</h4>
			</div>
		</div>
		<div class="actions" out:fly={{ duration: 500, y: 40 }}>
			<Button
				disabled
				hierarchy="secondary-gray"
				text={m.emptyRoundImportButton()}
				on:click={onClickImport}
			/>
			<Button hierarchy="primary" text={m.emptyRoundGenerateButton()} on:click={onClickGenerate} />
		</div>
	</div>
</div>

<style lang="scss">
	.bg {
		z-index: -1;
		top: 28px;
		position: absolute;
	}

	.emptyRound {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 20dvh;
		flex: 1 0 0;
	}

	.emptyState {
		display: flex;
		width: 512px;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-4xl, 32px);
		flex: 1 0 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-4xl, 32px);
		flex: 1 0 0;
		position: relative;

		.featuredIconBg {
			background-color: var(--color-bg-primary);
		}

		.allText {
			display: flex;
			max-width: 352px;
			flex-direction: column;
			align-items: center;
			gap: var(--spacing-md, 8px);
			align-self: stretch;

			h2 {
				align-self: stretch;
				color: var(--color-text-primary, #101828);
				text-align: center;

				/* Text xl/Semibold */
				font-family: Inter;
				font-size: 20px;
				font-style: normal;
				font-weight: 600;
				line-height: 30px; /* 150% */
			}

			h4 {
				align-self: stretch;
				color: var(--color-text-tertiary, #475467);
				text-align: center;

				/* Text md/Regular */
				font-family: Inter;
				font-size: 16px;
				font-style: normal;
				font-weight: 400;
				line-height: 24px; /* 150% */
			}
		}
	}

	.actions {
		display: flex;
		padding: var(--spacing-none, 0px);
		align-items: flex-start;
		gap: var(--spacing-lg, 12px);
	}
</style>
