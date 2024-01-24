import { extractValuesAsTuple } from '$lib/utils';
import { z } from 'zod';

export const TourneyState = {
	Starting: 'starting',
	InProgress: 'in-progress',
	Finished: 'finished'
} as const;

export type ITourneyState = (typeof TourneyState)[keyof typeof TourneyState];

export const schemaTourneySettings = z.object({
	name: z.string(),
	date: z.string(),
	organizer: z.number().int().nonnegative().optional(),
	city: z.string(),
	format: z.enum(['constructed', 'limited']),
	level: z.string(),
	rounds: z.number().int().nonnegative(),
	headJudge: z.number().int().nonnegative().optional(),
	state: z.enum(extractValuesAsTuple(TourneyState))
});

export type ITourneySettings = z.infer<typeof schemaTourneySettings>;
