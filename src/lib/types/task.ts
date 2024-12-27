export interface Task {
	id: number;
	name: string;
	description?: string | undefined | null;
	done: boolean;
	date: Date;
}
