<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<button class="logoWrapper" on:click={() => goto('/')} tabindex={-1}>
	<div class="logo">
		<div class="content">
			<div class="circleDot"></div>
			<div class="bg"></div>
			<div class="blur"></div>
		</div>
	</div>
	<span class="text"> Praetor </span>
</button>

<style lang="scss">
	.logoWrapper {
		display: flex;
		width: 142px;
		// height: 48px;
		justify-content: flex-start;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		background: transparent;
		border: none;
		width: 100%;
		padding: var(--spacing-sm);
		user-select: none;
		outline: none;
	}

	.logo {
		display: flex;
		align-items: flex-start;
		border-radius: var(--spacing-md, 8px);
		background: var(--gradient-brand-700-600-45-deg);
		box-shadow:
			0px 1px 2px 0px rgba(16, 24, 40, 0.06),
			0px 1px 3px 0px rgba(16, 24, 40, 0.1);

		.content {
			position: relative;
			width: 32px;
			height: 32px;
			border-radius: var(--spacing-md, 8px);

			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			z-index: 4;
		}

		.circleDot {
			position: absolute;
			border-radius: 100%;
			height: 16px;
			width: 16px;
			background: var(--gradient-linear-color-12);
			background: var(--gradient-linear-graytrue-02);
			// z-index: -2;
			box-shadow: var(--shadow-sm);
		}

		.bg {
			position: absolute;
			height: 32px;
			width: 32px;
			z-index: -3;
			border-radius: var(--spacing-md, 8px);
		}
	}
	.text {
		color: var(--color-text-primary);
		font-size: 18px;
		font-weight: 600;

		font-family: 'Inter';
		text-transform: capitalize;
	}
</style>
