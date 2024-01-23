<script lang="ts">
	import ButtonGroup from '$lib/components/ButtonGroup/ButtonGroup.svelte';
	import IconBR from '$lib/icons/countries/BR.svelte';
	import IconUS from '$lib/icons/countries/US.svelte';
	import { stPreferences } from '$lib/stores';
	import type { IButtonGroupItem } from '$lib/types';
	import type { IPreferences } from '$lib/types/preferences';
	import { availableLanguageTags } from '$paraglide/runtime';
	import SettingsHeader from './components/SettingsHeader.svelte';
	import SettingsItem from './components/SettingsItem.svelte';

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

	function onLanguageChange(lang: IPreferences['lang']) {
		stPreferences.changeLanguage(lang);
	}
</script>

<div class="wrapper">
	<SettingsHeader />
	<SettingsItem title="Language">
		<ButtonGroup
			items={languageButtons}
			value={$stPreferences.lang}
			on:change={({ detail }) => onLanguageChange(detail)}
		/>
	</SettingsItem>
</div>

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
