import { z } from 'zod';

const dateSchema = z
	.union([z.string(), z.date()])
	.transform((val) => {
		if (typeof val === 'string') {
			return new Date(val);
		}
		return val;
	})
	.refine((val) => val instanceof Date, {
		message: 'Invalid date'
	});

const taskSchema = z.object({
	id: z.string().min(1, 'The id is required'),
	name: z.string().min(1, 'The name is required'),
	description: z.string(),
	done: z.boolean({ coerce: true, message: "'Done' must be true or false" }),
	date: dateSchema
});

const taskProtoSchema = z.object({
	name: z.string().min(1, 'The name is required'),
	description: z.string()
});

export const tasksStateSchema = z.object({
	data: z.array(z.tuple([z.string().min(1, 'The id is required'), taskSchema])),
	daily: z.array(z.tuple([z.string(), z.array(z.string().min(1, 'The id is required'))])),
	recurrent: z.array(z.tuple([z.string(), taskProtoSchema]))
});
