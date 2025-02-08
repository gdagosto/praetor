<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import { veknApi } from '$lib/utils';

    let inputVeknId: number | undefined;


    async function onSubmit() {
        if (!inputVeknId || inputVeknId < 0) return;
        const data = await veknApi(`event/${inputVeknId}`);
        console.log('eventData',data.events[0])
    }
</script>

<header class="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
	<Breadcrumb.Root>
		<Breadcrumb.Item>
			<Breadcrumb.Page>
				{m.add_event_button_import_vekn()}
			</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.Root>
</header>

<form class="flex w-full max-w-sm items-center space-x-2">
    <Input type="number" min={1} bind:value={inputVeknId} placeholder={m.add_event_vekn_input_id_placeholder()} />
    <Button type="submit" onclick={onSubmit}>{m.add_event_vekn_input_id_button_import()}</Button>
  </form>
