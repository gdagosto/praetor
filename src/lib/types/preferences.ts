import { z } from 'zod';

export const schemaPreferences = z.object({
	darkMode: z.boolean(),
	lang: z.enum(['br', 'en'])
});

export type IPreferences = z.infer<typeof schemaPreferences>;
