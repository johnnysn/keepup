import type { Task } from '$lib/types/task';

const task1 = {
	id: 1,
	name: 'Do homework',
	description: 'I have a few math problems to finish',
	done: false,
	date: new Date(),
	recurrent: false
};

const task2 = {
	id: 2,
	name: 'Workout',
	done: true,
	date: new Date(),
	recurrent: false
};

export const tasks = $state<Task[]>([task1, task2]);
