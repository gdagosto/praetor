import type { IPlayer } from '$lib/types';
import generator from './generatorWorker';

self.onmessage = (e) => {
	if (e.data.type === 'reset') {
		resetRoundGenerator();
	} else if (e.data.type === 'generate') {
		generateRoundSeatings(e.data.round, e.data.players);
	}
};

function resetRoundGenerator() {
	generator.reset();
	console.log(generator.sg.rounds);
}

function generateRoundSeatings(round: number, players: IPlayer[]) {
	const t0 = performance.now();
	const score = generator.generateRound(round, players);
	console.log('Generating the round took ' + (performance.now() - t0) + ' milliseconds.');
	console.log(`Final score: ${score}. Generated round below:`);
	console.log(generator.sg.rounds);

	postMessage({
		type: 'finish',
		roundId: round,
		rounds: generator.sg.rounds
	});
}

function generatorCallback(iter: number) {
	postMessage({
		type: 'cb',
		percent: iter / generator.sg.ITERATIONS
	});
}

generator.sg.cb = generatorCallback;
