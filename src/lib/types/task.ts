export interface Task {
	id: string;
	name: string;
	description?: string | null;
	done: boolean;
	recurrent_id?: string | null;
	date: Date;
}
