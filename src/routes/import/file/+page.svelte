<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	let value = $state('');
	let fileInput: HTMLInputElement | undefined = $state();

	$inspect('value', value);

	function onChange(e: any) {
		console.log('on_change', e.target.files);
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			console.log(reader.result);
		});

		reader.readAsText(e.target.files[0], 'utf-8');
	}
</script>

<Input type="file" onchange={onChange} bind:value />
