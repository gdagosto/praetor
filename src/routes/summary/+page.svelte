<script lang="ts">
	import { Table } from '$lib/components/index.js';
	import FilePenLine from 'lucide-svelte/icons/file-pen-line';
	import UserRoundPlus from 'lucide-svelte/icons/user-round-plus';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import type { IPlayer, ITableOptions, ITableRow } from '$lib/types';
	import ModalNovoUsuario from './components/ModalNovoUsuario.svelte';
	import { stCurrentPage, stPlayers, stRounds } from '$lib/stores';
	import ModalDeletarUsuario from './components/ModalDeletarUsuario.svelte';
	import * as m from '$paraglide/messages.js';

	// Save current page
	stCurrentPage.set('summary');

	let showModalAdd: () => void;
	let showModalDelete: () => void;
	let idUser = -1;

	function onEdit(row: ITableRow) {
		idUser = row.idx as number;
		showModalAdd();
	}

	function onDelete(row: ITableRow) {
		idUser = row.idx as number;
		showModalDelete();
	}

	function onNewUser() {
		idUser = -1;
		showModalAdd();
	}

	// While loading summary page, calculate all VPs, GWs and TPs
	function onLoad() {
		const rounds = $stRounds;
		const players = $stPlayers;
		const playersById: Record<number, { vp: number; gw: number; tp: number }> = {};

		players.forEach((p) => {
			playersById[p.id] = { vp: 0, gw: 0, tp: 0 };
		});

		rounds.forEach((r) => {
			r.tables.forEach((t) => {
				t.players.forEach((p) => {
					playersById[p.id].vp += p.vp;
					playersById[p.id].gw += p.gw;
					playersById[p.id].tp += p.tp;
				});
			});
		});

		players.forEach((p, idx) => {
			players[idx].vp = playersById[p.id].vp;
			players[idx].gw = playersById[p.id].gw;
			players[idx].tp = playersById[p.id].tp;
		});

		stPlayers.set(players);
	}

	onLoad();

	let options: ITableOptions;
	$: options = {
		title: {
			text: m.summaryHeaderTitle(),
			badge: m.summaryHeaderBadge({ count: $stPlayers.length }),
			description: m.summaryHeaderSubtitle(),
			controls: [
				{
					hierarchy: 'primary',
					onClick: onNewUser,
					text: m.summaryHeaderNewPlayerButton(),
					icon: UserRoundPlus
				}
			]
		},
		controls: [
			{
				tooltip: m.summaryTableTooltipDelete(),
				icon: Trash2,
				onClick: onDelete
			},
			{
				tooltip: m.summaryTableTooltipEdit(),
				icon: FilePenLine,
				onClick: onEdit
			}
		]
	};

	const headers = [
		{
			id: 'name',
			text: m.summaryTableHeaderName()
		},
		{
			id: 'id',
			text: 'Vekn ID'
		},
		{
			id: 'gw',
			text: 'GWs'
		},
		{
			id: 'vp',
			text: 'VPs'
		},
		{
			id: 'tp',
			text: 'TPs'
		}
	];

	$: rows = updateRows($stPlayers);

	function updateRows(players: IPlayer[]) {
		return players
			.map((player, idx) => ({
				id: player.id,
				name: `${player.firstName} ${player.lastName}`,
				vp: player.vp,
				gw: player.gw,
				tp: player.tp,
				idx
			}))
			.sort((a, b) => {
				if (a.gw !== b.gw) return b.gw - a.gw;
				if (a.vp !== b.vp) return b.vp - a.vp;
				return b.tp - a.tp;
			});
	}
</script>

<div class="wrapper">
	<Table {headers} {rows} {options} />
</div>

<!-- Modal de editar usuário -->
<ModalNovoUsuario bind:showModal={showModalAdd} id={idUser} />
<ModalDeletarUsuario bind:showModal={showModalDelete} id={idUser} />

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
