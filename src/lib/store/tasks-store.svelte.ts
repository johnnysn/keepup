import type { Task } from '$lib/types/task';
import type { TaskProto } from '$lib/types/task-proto';
import { formatDate } from '$lib/utils';
import { SvelteMap } from 'svelte/reactivity';

export type TasksState = {
	data: SvelteMap<string, Task>;
	daily: SvelteMap<string, string[]>;
	recurrent: SvelteMap<string, TaskProto>;
};

export const tasks = $state<TasksState>({
	data: new SvelteMap(),
	daily: new SvelteMap(),
	recurrent: new SvelteMap()
});

export function updateTasksState(state: TasksState) {
	tasks.daily = state.daily;
	tasks.recurrent = state.recurrent;
	tasks.data = state.data;
}

function getId() {
	const timestamp = Date.now().toString(36);
	const randomPart = Math.random().toString(36).substring(2, 10);
	const counter = Math.floor(Math.random() * 1000).toString(36);

	return timestamp + randomPart + counter;
}

export function addEmptyDate(strDate: string) {
	const arr = $state([]);
	tasks.daily.set(strDate, arr);
}

export function addNewTaskNow(index?: number, date?: Date) {
	const id = getId();
	const task = $state({
		id,
		name: '',
		description: '',
		date: date ?? new Date(),
		done: false
	});

	tasks.data.set(id, task);
	const strDate = formatDate(task.date);

	if (!tasks.daily.has(strDate)) {
		addEmptyDate(strDate);
	}

	const todayArr = tasks.daily.get(strDate)!;
	if (index !== undefined && index < todayArr.length) {
		todayArr.splice(index, 0, id);
	} else {
		todayArr.push(id);
	}
}

export function patchTask(id: string, data: Partial<Task>) {
	const task = tasks.data.get(id);

	if (task) {
		if (data.name) data.name = data.name.trim();
		if (data.description) data.description = data.description.trim();
		Object.assign(task, data);
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
			// console.log($state.snapshot(arr));
		}

		const strDateToday = formatDate(new Date());
		if (strDate === strDateToday) removeRecurrency(id);

		tasks.data.delete(id);
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

export function createRecurrentTasks(date: Date) {
	const strDate = formatDate(date);

	const newDateArr = $state([]);
	const dateArr: string[] = tasks.daily.has(strDate) ? tasks.daily.get(strDate)! : newDateArr;
	const addedNames = new Set<string>();

	for (let existingId of dateArr) {
		if (tasks.data.has(existingId)) addedNames.add(tasks.data.get(existingId)!.name);
	}

	if (tasks.daily.size > 0) {
		// Try to mirror the order from the previous day
		const days = Array.from(tasks.daily.keys());
		days.sort((a, b) => a.localeCompare(b));
		const dayBeforeIndex = days.findIndex((sd) => sd === strDate);
		const dayBeforeDateStr = dayBeforeIndex > 0 ? days[dayBeforeIndex - 1] : 'nope';

		const dayBeforeTasksIds = tasks.daily.get(dayBeforeDateStr);
		if (dayBeforeTasksIds) {
			const tasksBefore = dayBeforeTasksIds
				.map((id) => tasks.data.get(id)!)
				.filter((t) => !addedNames.has(t.name));

			for (let i = 0; i < tasksBefore.length; i++) {
				const t = tasksBefore[i];
				const proto = tasks.recurrent.get(t.name);
				if (proto) {
					const newTask = $state({
						...proto,
						done: false,
						id: getId(),
						date
					});

					tasks.data.set(newTask.id, newTask);
					addedNames.add(newTask.name);
					dateArr.push(newTask.id);
				}
			}
		}
	}

	const remainingProtos = tasks.recurrent
		.entries()
		.filter((e) => !addedNames.has(e[0]))
		.map((e) => e[1]);

	for (const proto of remainingProtos) {
		const newTask = $state({
			...proto,
			done: false,
			id: getId(),
			date
		});

		tasks.data.set(newTask.id, newTask);
		dateArr.push(newTask.id);
	}

	tasks.daily.set(strDate, dateArr);
}
