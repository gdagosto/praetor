<script lang="ts">
	import { Button, ButtonGroup, SettingsHeader, SettingsItem, TextInput } from '$lib/components';
	import {
		stCurrentPage,
		stCurrentTabRound,
		stPlayers,
		stRounds,
		stTourneySettings
	} from '$lib/stores';
	import type { IButtonGroupItem, IHeaderControl } from '$lib/types';
	import { TourneyState, type ITourneySettings } from '$lib/types/tourney';
	import * as m from '$paraglide/messages.js';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
	import PlaySquare from 'lucide-svelte/icons/play-square';
	import { resetRoundGenerator } from '$lib/seatings/generator';
	// Save current page
	stCurrentPage.set('tourney');

	const headerControls: IHeaderControl[] = [
		{
			text: m.tourneyHeaderButtonStart(),
			hierarchy: 'primary',
			icon: PlaySquare,
			onClick: onStartTourney
		}
	];

	const formatButtons: IButtonGroupItem[] = [
		{
			text: m.tourneyItemFormatOptionConstructed(),
			value: 'constructed'
		},
		{ text: m.tourneyItemFormatOptionLimited(), value: 'limited' }
	];

	function onInputChange(col: keyof ITourneySettings, rawData: string) {
		console.log('onInputChange', col, rawData);
		let data: number | string | undefined = rawData;

		if (col === 'headJudge' || col === 'organizer' || col === 'rounds') {
			data = parseInt(rawData);
			if (isNaN(data)) data = undefined;
		}

		stTourneySettings.updateCol(col, data);
	}

	function onStartTourney() {
		stTourneySettings.updateCol('state', TourneyState.InProgress);

		// Initialize rounds
		for (let i = 0, iMax = $stTourneySettings.rounds; i < iMax; i++) {
			console.log('add');
			stRounds.add();
		}

		// Reset round generator
		resetRoundGenerator();
	}

	function onResetTourney() {
		stTourneySettings.updateCol('state', TourneyState.Starting);
		stRounds.reset();
		stCurrentTabRound.set(0);

		// Reset disqualifications
		stPlayers.resetDQ();
	}
</script>

<OverlayScrollbarsComponent style="width: 100%">
	<div class="wrapper">
		<SettingsHeader
			title={m.tourneyHeaderTitle()}
			subtitle={m.tourneyHeaderSubtitle()}
			controls={headerControls}
		/>

		<!-- EventName -->
		<SettingsItem
			title={m.tourneyItemEventNameLabelTitle()}
			subtitle={m.tourneyItemEventNameLabelSubtitle()}
		>
			<TextInput
				placeholder={m.tourneyItemEventNameLabelTitle()}
				value={$stTourneySettings.name}
				on:change={({ detail }) => onInputChange('name', detail)}
			/>
		</SettingsItem>

		<!-- EventDate -->
		<SettingsItem
			title={m.tourneyItemEventDateLabelTitle()}
			subtitle={m.tourneyItemEventDateLabelSubtitle()}
		>
			<TextInput
				placeholder={m.tourneyItemEventDateLabelTitle()}
				value={$stTourneySettings.date}
				on:change={({ detail }) => onInputChange('date', detail)}
			/>
		</SettingsItem>

		<!-- Organizer -->
		<SettingsItem
			title={m.tourneyItemOrganizerLabelTitle()}
			subtitle={m.tourneyItemOrganizerLabelSubtitle()}
		>
			<TextInput
				placeholder={m.tourneyItemOrganizerLabelTitle()}
				value={$stTourneySettings.organizer?.toString() ?? ''}
				on:change={({ detail }) => onInputChange('organizer', detail)}
			/>
		</SettingsItem>

		<!-- City -->
		<SettingsItem title={m.tourneyItemCityLabelTitle()} subtitle={m.tourneyItemCityLabelSubtitle()}>
			<TextInput
				placeholder={m.tourneyItemCityLabelTitle()}
				value={$stTourneySettings.city}
				on:change={({ detail }) => onInputChange('city', detail)}
			/>
		</SettingsItem>

		<!-- Format -->
		<SettingsItem
			title={m.tourneyItemFormatLabelTitle()}
			subtitle={m.tourneyItemFormatLabelSubtitle()}
		>
			<ButtonGroup
				type="color"
				items={formatButtons}
				value={$stTourneySettings.format}
				on:change={({ detail }) => onInputChange('format', detail)}
			/>
		</SettingsItem>

		<!-- Level -->
		<SettingsItem
			title={m.tourneyItemLevelLabelTitle()}
			subtitle={m.tourneyItemLevelLabelSubtitle()}
		>
			<TextInput
				placeholder={m.tourneyItemLevelLabelTitle()}
				value={$stTourneySettings.level}
				on:change={({ detail }) => onInputChange('level', detail)}
			/>
		</SettingsItem>

		<!-- NumberOfRounds -->
		<SettingsItem
			title={m.tourneyItemNumberOfRoundsLabelTitle()}
			subtitle={m.tourneyItemNumberOfRoundsLabelSubtitle()}
		>
			<TextInput
				disabled={$stTourneySettings.state !== TourneyState.Starting}
				placeholder={m.tourneyItemNumberOfRoundsLabelTitle()}
				value={$stTourneySettings.rounds.toString()}
				on:change={({ detail }) => onInputChange('rounds', detail)}
			/>
		</SettingsItem>

		<!-- HeadJudge -->
		<SettingsItem
			title={m.tourneyItemHeadJudgeLabelTitle()}
			subtitle={m.tourneyItemHeadJudgeLabelSubtitle()}
		>
			<TextInput
				placeholder={m.tourneyItemHeadJudgeLabelTitle()}
				value={$stTourneySettings.headJudge?.toString() ?? ''}
				on:change={({ detail }) => onInputChange('headJudge', detail)}
			/>
		</SettingsItem>

		<SettingsItem
			title={m.tourneyItemResetLabelTitle()}
			subtitle={m.tourneyItemResetLabelSubtitle()}
		>
			<Button
				hierarchy="primary-destructive"
				text={m.tourneyItemResetButton()}
				on:click={() => onResetTourney()}
			/>
		</SettingsItem>
	</div>
</OverlayScrollbarsComponent>

<style lang="scss">
	.wrapper {
		display: flex;
		padding: 32px var(--spacing-4xl) var(--spacing-6xl, 48px) var(--spacing-4xl);
		flex-direction: column;
		align-items: center;
		gap: 32px;
		flex: 1 0 0;
	}
</style>
