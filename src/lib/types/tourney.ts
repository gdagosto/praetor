import { extractValuesAsTuple } from '$lib/utils';
import { z } from 'zod';

export const TourneyState = {
	Starting: 'starting',
	InProgress: 'in-progress',
	Finished: 'finished'
} as const;

export const schemaTourneyState = z.enum(extractValuesAsTuple(TourneyState));

export type ITourneyState = (typeof TourneyState)[keyof typeof TourneyState];

export const schemaTourneyFormat = z.enum(['constructed', 'limited']);
export type ITourneyFormat = z.infer<typeof schemaTourneyFormat>;

export const schemaTourneySettings = z.object({
	name: z.string(),
	date: z.string(),
	organizer: z.number().int().nonnegative().optional(),
	city: z.string(),
	format: schemaTourneyFormat,
	level: z.string(),
	rounds: z.number().int().nonnegative(),
	headJudge: z.number().int().nonnegative().optional(),
	state: schemaTourneyState
});

export type ITourneySettings = z.infer<typeof schemaTourneySettings>;
