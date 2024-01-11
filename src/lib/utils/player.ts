import { stPlayers } from '$lib/stores';
import type { IPlayer } from '$lib/types';

/** Cannot be exported by barrel module index.ts. Import order is making stPlayers error out */
export function getPlayerNameById(id: number) {
	const player = $stPlayers.find((p) => p.id === id);
	if (!player) return `PLAYER_${id}_MISSING`;

	return player.firstName + ' ' + player.lastName;
}

let $stPlayers: IPlayer[];
stPlayers.subscribe((val) => ($stPlayers = val));
