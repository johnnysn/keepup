<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { deleteTask, getTask } from '$lib/store/tasks-store.svelte';
	import { type Task } from '$lib/types/task';
	import { cn } from '$lib/utils';
	import Button from './ui/button/button.svelte';
	import { Trash2, Edit } from 'lucide-svelte';

	type Props = {
		task: Task;
	};

	const { task }: Props = $props();
	const id = `chk${task.id}`;
	const labelClass = $derived(`${task.done ? 'line-through' : ''}`);

	function check(checked: boolean) {
		const objTask = getTask(task.id);

		if (objTask) {
			objTask.done = checked;
		}
	}

	function del() {
		deleteTask(task.id);
	}
</script>

<div
	class="items-top flex w-full max-w-xs space-x-2 rounded border border-transparent px-1 py-2 hover:border-border"
>
	<Checkbox {id} onCheckedChange={(checked) => check(!!checked)} checked={task.done} />
	<div class="grid flex-1 items-center gap-1.5 leading-none">
		<Label
			for={id}
			class={`text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${labelClass}`}
		>
			<input
				type="text"
				class={cn(
					'w-[180px] border-none bg-transparent p-0 text-foreground focus:text-foreground focus:outline-none focus:ring-0',
					labelClass
				)}
				bind:value={task.name}
			/>
		</Label>
		<input
			type="text"
			class="w-[180px] border-none bg-transparent p-0 text-sm text-foreground/50 focus:text-foreground focus:outline-none focus:ring-0"
			placeholder="Add description"
			bind:value={task.description}
		/>
	</div>
	<div class="items-top flex w-[80px] gap-1">
		<Button variant="outline" size="icon" on:click={del}>
			<Edit class="size-4" />
		</Button>
		<Button variant="outline" size="icon" on:click={del}>
			<Trash2 class="size-4" />
		</Button>
	</div>
</div>
