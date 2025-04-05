<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import { cn } from '$lib/utils/index.js';
	import MessageCircle from '@lucide/svelte/icons/message-circle';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Settings from '@lucide/svelte/icons/settings';
	import Trash2 from '@lucide/svelte/icons/trash-2';

	interface IProps {
		ondelete: () => void;
		onedit: () => void;
		onexport: (results: boolean) => void;
	}

	let { ondelete, onedit, onexport }: IProps = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={cn(buttonVariants({ variant: 'outline' }), 'text-foreground h-10 w-10 p-2 shadow-sm')}
	>
		<Settings class="h-8 w-8" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="mx-4 w-64">
		<DropdownMenu.Group>
			<DropdownMenu.Item onclick={() => onexport(false)}>
				<MessageCircle class="mr-2 size-4" />
				<span>{m.round_export_seatings_title()}</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => onexport(true)}>
				<MessageCircle class="mr-2 size-4" />
				<span>{m.round_export_results_title()}</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item onclick={onedit}>
				<Pencil class="mr-2 size-4" />
				<span>{m.round_edit_title()}</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item onclick={ondelete}>
				<Trash2 class="mr-2 size-4" />
				<span>{m.round_delete_dialog_title()}</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
