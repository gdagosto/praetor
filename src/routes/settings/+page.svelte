<script lang="ts">
	import { Button, ButtonGroup, SettingsHeader, SettingsItem } from '$lib/components';
	import IconBR from '$lib/icons/countries/BR.svelte';
	import IconUS from '$lib/icons/countries/US.svelte';
	import { stCurrentPage, stPreferences } from '$lib/stores';
	import type { IButtonGroupItem } from '$lib/types';
	import type { IPreferences } from '$lib/types/preferences';
	import { playerDB } from '$lib/vekn';
	import * as m from '$paraglide/messages.js';
	import { availableLanguageTags } from '$paraglide/runtime';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';

	// Save current page
	stCurrentPage.set('settings');

	const languageSettings = {
		br: {
			text: 'Português (Brasil)',
			icon: IconBR
		},
		en: {
			text: 'English (US)',
			icon: IconUS
		}
	};

	const languageButtons: IButtonGroupItem[] = availableLanguageTags.map((lang) => ({
		...languageSettings[lang],
		value: lang
	}));

	const themeButtons: IButtonGroupItem[] = [
		{
			text: m.settingsItemThemeItemLight(),
			icon: Sun,
			value: false
		},
		{
			text: m.settingsItemThemeItemDark(),
			icon: Moon,
			value: true
		}
	];

	function onLanguageChange(lang: IPreferences['lang']) {
		stPreferences.changeLanguage(lang);
	}

	function onThemeChange(theme: IPreferences['darkMode']) {
		stPreferences.partialUpdate({ darkMode: theme });
	}
</script>

<OverlayScrollbarsComponent style="width: 100%">
	<div class="wrapper">
		<SettingsHeader title={m.settingsHeaderTitle()} subtitle={m.settingsHeaderSubtitle()} />
		<SettingsItem title={m.settingsItemLanguageLabelTitle()}>
			<ButtonGroup
				type="color"
				items={languageButtons}
				value={$stPreferences.lang}
				on:change={({ detail }) => onLanguageChange(detail)}
			/>
		</SettingsItem>
		<SettingsItem
			title={m.settingsItemThemeLabelTitle()}
			subtitle={m.settingsItemThemeLabelSubtitle()}
		>
			<ButtonGroup
				type="color"
				items={themeButtons}
				value={$stPreferences.darkMode}
				on:change={({ detail }) => onThemeChange(detail)}
			/>
		</SettingsItem>
		<SettingsItem
			title={m.settingsItemUpdateDbLabelTitle()}
			subtitle={m.settingsItemUpdateDbLabelSubtitle()}
		>
			<Button
				hierarchy="primary-destructive"
				text={m.settingsItemUpdateDbButton()}
				on:click={() => playerDB.forceUpdatePlayerDB()}
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
