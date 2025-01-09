<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { deleteTask, patchTask, tasks } from '$lib/store/tasks-store.svelte';
	import { type Task } from '$lib/types/task';
	import { cn } from '$lib/utils';
	import Button from './ui/button/button.svelte';
	import { Trash2, Edit } from 'lucide-svelte';

	type Props = {
		task: Task;
	};

	const { task }: Props = $props();
	const id = `chk${task.id}`;

	let nameInput: HTMLInputElement;
	let nameValue = $state(task.name);
	let descriptionValue = $state(task.description);

	const labelClass = $derived(`${task.done ? 'line-through' : ''}`);

	$effect(() => {
		if (task.id === tasks.empty) {
			nameInput.focus();
		}
	});

	function updateTask() {
		patchTask(task.id, {
			name: nameValue,
			description: descriptionValue
		});
	}

	function updateDone(checked: boolean) {
		patchTask(task.id, {
			done: checked
		});
	}

	function del() {
		deleteTask(task.id);
	}
</script>

<div
	class="items-top flex w-full max-w-screen-sm space-x-2 rounded border border-transparent px-1 py-2 hover:border-border"
>
	<Checkbox {id} onCheckedChange={(checked) => updateDone(!!checked)} />
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
				onblur={updateTask}
				bind:value={nameValue}
				bind:this={nameInput}
			/>
		</Label>
		<input
			type="text"
			class="w-[180px] border-none bg-transparent p-0 text-sm text-foreground/50 focus:text-foreground focus:outline-none focus:ring-0"
			placeholder="Add description"
			onblur={updateTask}
			bind:value={descriptionValue}
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
