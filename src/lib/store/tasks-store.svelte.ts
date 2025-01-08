import { taskSchema } from '$lib/schemas/task-schema';
import type { Task } from '$lib/types/task';
import type { z } from 'zod';

type TasksState = {
	data: Task[];
	empty: Task | null;
};

export const tasks = $state<TasksState>({
	data: [],
	empty: null
});

export function getTask(id: number) {
	return tasks.data.find((t) => t.id === id);
}

export function addEmptyTask(order: number) {
	const empty = {
		id: getId(),
		order,
		name: '',
		description: '',
		recurrent: false,
		date: new Date(),
		done: false
	};

	tasks.empty = empty;
	tasks.data.push(empty);
}

function getId() {
	return tasks.data.length === 0 ? 1 : Math.max(...tasks.data.map((t) => t.id)) + 1;
}

export function addTask(taskData: z.infer<typeof taskSchema>) {
	const data = taskSchema.parse(taskData);

	const id = getId();

	tasks.data.push({
		id,
		...data,
		date: new Date(),
		done: false
	});
}

export function deleteTask(id: number) {
	const index = tasks.data.findIndex((t) => t.id === id);

	if (index >= 0) {
		tasks.data.splice(index, 1);
	}
}
