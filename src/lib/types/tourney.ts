import { z } from 'zod';

export const schemaTourneySettings = z.object({
	name: z.string(),
	date: z.string(),
	organizer: z.number().int().nonnegative().optional(),
	city: z.string(),
	format: z.enum(['constructed', 'limited']),
	level: z.string(),
	rounds: z.number().int().nonnegative(),
	headJudge: z.number().int().nonnegative().optional()
});

export type ITourneySettings = z.infer<typeof schemaTourneySettings>;
