import type { Task } from '$lib/types/task';
import type { TaskProto } from '$lib/types/task-proto';
import { formatDate } from '$lib/utils';
import { SvelteMap } from 'svelte/reactivity';

type TasksState = {
	data: SvelteMap<string, Task>;
	daily: SvelteMap<string, string[]>;
	recurrent: SvelteMap<string, TaskProto>;
	empty?: string | null;
};

export const tasks = $state<TasksState>({
	data: new SvelteMap(),
	daily: new SvelteMap(),
	recurrent: new SvelteMap(),
	empty: null
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
	const task = $state({
		id,
		name: '',
		description: '',
		date: new Date(),
		done: false
	});

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

	// Gotta clear previously empty task
	if (tasks.empty) {
		deleteTask(tasks.empty);
	}
	tasks.empty = id;
}

export function patchTask(id: string, data: Partial<Task>) {
	const task = getTask(id);

	if (task) {
		if (data.name) data.name = data.name.trim();
		if (data.description) data.description = data.description.trim();
		Object.assign(task, data);

		if (task.id === tasks.empty && task.name.length > 0) {
			tasks.empty = null;
		}
	}
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

		if (tasks.empty === id) tasks.empty = null;
	}
}

export function addRecurrency(id: string) {
	const task = tasks.data.get(id);

	if (task && !tasks.recurrent.has(task.name)) {
		tasks.recurrent.set(task.name, {
			name: task.name,
			description: task.description
		});
	}
}

export function removeRecurrency(id: string) {
	const task = tasks.data.get(id);

	if (task && tasks.recurrent.has(task.name)) {
		tasks.recurrent.delete(task.name);
	}
}

export function updateDailyArrayOrder(items: Task[]) {
	const strDate = formatDate(new Date());

	if (tasks.daily.has(strDate)) {
		const dailyArr = tasks.daily.get(strDate)!;

		for (let i = 0; i < items.length; i++) {
			dailyArr[i] = items[i].id;
		}
	}
}
