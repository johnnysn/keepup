import { z } from 'zod';

export const taskSchema = z.object({
	name: z.string().min(0, 'Please, input a name'),
	description: z.string().optional(),
	recurrent: z.boolean({ coerce: true, message: 'Inform if the task is recurrent' })
});
