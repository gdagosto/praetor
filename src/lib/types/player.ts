import { z } from 'zod';

export const schemaPlayer = z.object({
	id: z.number().int().positive(),
	firstName: z.string(),
	lastName: z.string(),
	vp: z.number().int().nonnegative(),
	gw: z.number().int().nonnegative(),
	tp: z.number().int().nonnegative(),
	coin: z.number().int().nonnegative(),
	vpFinals: z.number().int().nonnegative(),
	dq: z.boolean(),
	wd: z.boolean()
});

export const schemaPlayerArr = z.array(schemaPlayer);

export type IPlayer = z.infer<typeof schemaPlayer>;

export type IVeknPlayer = {
	city: string;
	countryname: string;
	firstname: string;
	lastname: string;
	statename: string;
	veknid: string;
};
