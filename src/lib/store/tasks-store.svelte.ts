import type { Task } from '$lib/types/task';
import { formatDate } from '$lib/utils';
import { SvelteMap } from 'svelte/reactivity';

type TasksState = {
	data: Map<string, Task>;
	daily: SvelteMap<string, string[]>;
	recurrent: string[];
};

export const tasks = $state<TasksState>({
	data: new Map(),
	daily: new SvelteMap(),
	recurrent: []
});

export function getTask(id: string) {
	return tasks.data.get(id);
}

function getId() {
	const timestamp = Date.now().toString(36);
	const randomPart = Math.random().toString(36).substring(2, 10);
	const counter = Math.floor(Math.random() * 1000).toString(36);

	return timestamp + randomPart + counter;
}

export function addNewTaskNow(index?: number) {
	const id = getId();
	const task = {
		id,
		name: '',
		description: '',
		date: new Date(),
		done: false
	};

	tasks.data.set(id, task);
	const strDate = formatDate(task.date);

	if (!tasks.daily.has(strDate)) {
		const arr = $state([]);
		tasks.daily.set(strDate, arr);
	}

	const todayArr = tasks.daily.get(strDate)!;
	if (index && index < todayArr.length) {
		todayArr.splice(index, 0, id);
	} else {
		todayArr.push(id);
	}

	console.log(tasks.daily);
}

export function deleteTask(id: string) {
	const task = tasks.data.get(id);

	if (task) {
		const strDate = formatDate(task.date);
		if (tasks.daily.has(strDate)) {
			const arr = tasks.daily.get(strDate)!;
			const index = arr.findIndex((s) => s === id);

			if (index > -1) arr.splice(index, 1);
		}

		tasks.data.delete(id);
	}
}
