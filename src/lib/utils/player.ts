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

export function sortPlayers(playersArr: IPlayer[]) {
	return structuredClone(playersArr).sort((a, b) => {
		if (a.dq) return 1;
		if (b.dq) return -1;
		if (a.wd) return 1;
		if (b.wd) return -1;
		if (a.vpFinals !== b.vpFinals) return b.vpFinals - a.vpFinals;
		if (a.gw !== b.gw) return b.gw - a.gw;
		if (a.vp !== b.vp) return b.vp - a.vp;
		return b.tp - a.tp;
	});
}
