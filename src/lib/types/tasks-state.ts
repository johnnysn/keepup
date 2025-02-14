import type { Task } from '$lib/types/task';
import type { TaskProto } from '$lib/types/task-proto';

export type TasksState = {
	data: Map<string, Task>;
	daily: Map<string, string[]>;
	recurrent: Map<string, TaskProto>;
};
