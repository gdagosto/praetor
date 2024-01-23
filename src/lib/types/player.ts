import { z } from 'zod';

export const schemaPlayer = z.object({
	id: z.number().int().positive(),
	firstName: z.string(),
	lastName: z.string(),
	vp: z.number().int().nonnegative(),
	gw: z.number().int().nonnegative(),
	tp: z.number().int().nonnegative(),
	dq: z.boolean()
});

export const schemaPlayerArr = z.array(schemaPlayer);

export type IPlayer = z.infer<typeof schemaPlayer>;
