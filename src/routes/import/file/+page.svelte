<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	let value = $state('');
	let fileInput: HTMLInputElement | undefined = $state();

	$inspect('value', value);

	$effect(() => {
		if (!fileInput) return;
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			console.log(reader.result);
		});

		reader.readAsText(fileInput.files[0], 'utf-8');
	});
</script>

<Input type="file" bind:ref={fileInput} bind:value />
