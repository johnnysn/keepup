<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		addRecurrency,
		deleteTask,
		patchTask,
		removeRecurrency,
		tasks
	} from '$lib/store/tasks-store.svelte';
	import { type Task } from '$lib/types/task';
	import { cn } from '$lib/utils';
	import Button from './ui/button/button.svelte';
	import { Trash2, ChevronsDown, ChevronsUp } from 'lucide-svelte';

	type Props = {
		task: Task;
	};

	const { task }: Props = $props();
	const id = `chk${task.id}`;

	let nameInput: HTMLInputElement;

	let nameValue = $state(task.name);
	let descriptionValue = $state(task.description);
	let editMode = $state(false);
	let isRecurrent = $derived(tasks.recurrent.has(task.name));

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
		editMode = false;
	}

	function del() {
		deleteTask(task.id);
	}

	function onRecurrentChecked(checked: boolean) {
		if (checked) addRecurrency(task.id);
		else removeRecurrency(task.id);
	}
</script>

<form
	class="flex w-full flex-col px-2 py-1"
	onsubmit={(e) => {
		e.preventDefault();
		nameInput.blur();
	}}
>
	<div class="flex w-full items-center space-x-2">
		<Checkbox
			{id}
			onCheckedChange={(checked) => updateDone(!!checked)}
			checked={task.done}
			size={'lg'}
		/>
		<div class="grid flex-1 items-center gap-1.5 leading-none">
			<Label
				for={id}
				class={`text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${labelClass}`}
			>
				<input
					type="text"
					name="name"
					class={cn(
						'w-[180px] border-none bg-transparent p-0 text-foreground focus:text-foreground focus:outline-none focus:ring-0 md:w-full',
						labelClass
					)}
					onblur={updateTask}
					bind:value={nameValue}
					bind:this={nameInput}
				/>
			</Label>
		</div>
		<div class="items-top flex w-[80px] gap-1">
			<Button
				variant="outline"
				size="icon"
				on:click={() => {
					editMode = !editMode;
				}}
			>
				{#if editMode}
					<ChevronsUp class="size-4" />
				{:else}
					<ChevronsDown class="size-4" />
				{/if}
			</Button>
			<Button variant="outline" size="icon" on:click={del}>
				<Trash2 class="size-4" />
			</Button>
		</div>
	</div>
	{#if editMode}
		<div class="mt-2 flex flex-col gap-1.5 pl-3">
			<div class="flex items-center gap-2">
				<Checkbox
					id={id + 'rec'}
					size={'sm'}
					checked={isRecurrent}
					onCheckedChange={(checked) => onRecurrentChecked(!!checked)}
				/>
				<Label for={id + 'rec'} class="text-sm">Recurrent</Label>
			</div>
			<input
				type="text"
				name="description"
				class="w-[270px] border-none bg-transparent p-0 text-sm text-foreground/50 focus:text-foreground focus:outline-none focus:ring-0 md:w-full"
				placeholder="Add description here"
				onblur={updateTask}
				bind:value={descriptionValue}
			/>
		</div>
	{/if}
</form>
