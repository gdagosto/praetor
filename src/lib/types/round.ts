import { extractValuesAsTuple } from '$lib/utils';
import { z } from 'zod';

/* Enums */

export const RoundTableState = {
	Waiting: 'waiting',
	InProgress: 'in-progress',
	Finished: 'finished'
} as const;

export const RoundState = {
	Empty: 'empty',
	Generating: 'generating',
	Generated: 'generated',
	InProgress: 'in-progress',
	Finished: 'finished'
} as const;

export type IRoundTableState = (typeof RoundTableState)[keyof typeof RoundTableState];
export type IRoundState = (typeof RoundState)[keyof typeof RoundState];

/* Objects */

const schemaRoundPlayer = z.object({
	id: z.number().int().nonnegative(),
	vp: z.number().int().nonnegative(),
	gw: z.number().int().nonnegative()
});

const schemaRoundTable = z.object({
	players: z.array(schemaRoundPlayer),
	state: z.enum(extractValuesAsTuple(RoundTableState))
});

const schemaRound = z.object({
	tables: z.array(schemaRoundTable),
	state: z.enum(extractValuesAsTuple(RoundState))
});

export const schemaRounds = z.array(schemaRound);

export type IRoundPlayer = z.infer<typeof schemaRoundPlayer>;
export type IRoundTable = z.infer<typeof schemaRoundTable>;
export type IRound = z.infer<typeof schemaRound>;
