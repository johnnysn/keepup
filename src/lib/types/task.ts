export interface Task {
	id: number;
	name: string;
	description?: string | undefined | null;
	done: boolean;
	recurrent: boolean;
	date: Date;
	order: number;
}
