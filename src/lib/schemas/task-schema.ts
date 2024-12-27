import { z } from 'zod';

export const TaskSchema = z.object({
	name: z.string().min(0, 'Please, input a name'),
	description: z.string().optional(),
	date: z.date({ coerce: true, message: 'Please, setup a date for the task' }),
	done: z.boolean({ coerce: true, message: 'Inform if the task is done' })
});
