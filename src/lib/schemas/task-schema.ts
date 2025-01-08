import { z } from 'zod';

export const taskSchema = z.object({
	name: z.string().min(1, 'Please, input a name'),
	description: z.string().optional(),
	recurrent: z.boolean({ coerce: true, message: 'Inform if the task is recurrent' }),
	order: z.number().min(0).max(100)
});
