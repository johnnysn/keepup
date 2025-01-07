import { taskSchema } from '$lib/schemas/task-schema';
import type { Task } from '$lib/types/task';

type Tasks = {
	data: Task[];
};

export const tasks = $state<Tasks>({
	data: []
});

export function getTask(id: number) {
	return tasks.data.find((t) => t.id === id);
}

export function addTask(taskData: unknown) {
	const data = taskSchema.parse(taskData);

	const id = tasks.data.length === 0 ? 1 : Math.max(...tasks.data.map((t) => t.id)) + 1;

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
