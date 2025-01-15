import { SvelteMap } from 'svelte/reactivity';
import { tasks, updateTasksState, type TasksState } from './tasks-store.svelte';
import { tasksStateSchema } from '$lib/schemas/task-schema';
import { z } from 'zod';
import type { Task } from '$lib/types/task';

export function saveTasksToLocalStorage() {
	const serializedData = serializeTasksState();
	localStorage.setItem('tasksState', serializedData);
}

export function loadTasksFromLocalStorage() {
	const jsonData = localStorage.getItem('tasksState');

	if (jsonData) {
		try {
			const parsedData = JSON.parse(jsonData);
			const validatedData = tasksStateSchema.parse(parsedData);
			// console.log('Tasks data from the local storage has been succesfully parsed!');
			// console.log(validatedData);

			const data = deserializeTasksState(validatedData);

			console.log(data);
			updateTasksState(data);
		} catch (error) {
			console.error('There has been an error parsing local storage tasks data.');
			if (error instanceof z.ZodError) {
				console.error('Validation failed:', error.errors);
			}
		}
	}
}

function deserializeTasksState(parsedData: z.infer<typeof tasksStateSchema>): TasksState {
	const dataMap = new SvelteMap<string, Task>();
	for (const t of parsedData.data) {
		const taskState = $state(t[1]);
		const id = t[0];

		dataMap.set(id, taskState);
	}

	return {
		data: dataMap,
		daily: new SvelteMap(parsedData.daily),
		recurrent: new SvelteMap(parsedData.recurrent),
		empty: parsedData.empty
	};
}

function serializeTasksState(): string {
	const serializedState = {
		data: Array.from(tasks.data.entries()),
		daily: Array.from(tasks.daily.entries()),
		recurrent: Array.from(tasks.recurrent.entries()),
		empty: tasks.empty
	};

	return JSON.stringify(serializedState);
}
