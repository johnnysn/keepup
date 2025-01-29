import { SvelteMap } from 'svelte/reactivity';
import { tasks, updateTasksState, type TasksState } from './tasks-store.svelte';
import { tasksStateSchema } from '$lib/schemas/task-schema';
import { z } from 'zod';
import type { Task } from '$lib/types/task';
import { downloadLocalStorageAsJson } from '$lib/utils';

export function saveTasksToLocalStorage() {
	// console.log('Saving tasks to local storage...');
	const serializedData = serializeTasksState();
	localStorage.setItem('tasksState', serializedData);
}

export function loadTasksFromLocalStorage() {
	const jsonData = localStorage.getItem('tasksState');

	loadTasksFromJsonData(jsonData);
}

export function loadTasksFromJsonData(jsonData: string | null) {
	if (jsonData) {
		try {
			const parsedData = JSON.parse(jsonData);
			const validatedData = tasksStateSchema.parse(parsedData);

			const data = deserializeTasksState(validatedData);

			updateTasksState(data);
		} catch (error) {
			console.error('There has been an error parsing the tasks data.');
			if (error instanceof z.ZodError) {
				console.error('Validation failed:', error.errors);
			}
			throw error;
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

	const dailyMap = new SvelteMap<string, string[]>();
	for (const e of parsedData.daily) {
		const key = e[0];
		const arr = $state(e[1]);

		dailyMap.set(key, arr);
	}

	return {
		data: dataMap,
		daily: dailyMap,
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

export function downloadTasksData() {
	downloadLocalStorageAsJson('tasksState');
}
