<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dragHandleZone, dragHandle, type DndEvent } from 'svelte-dnd-action';
	import { addNewTaskNow, tasks, updateDailyArrayOrder } from '$lib/store/tasks-store.svelte';
	import TaskItem from './TaskItem.svelte';
	import { GripVertical, Plus } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { dateFromStr } from '$lib/utils';

	type Props = {
		strDate: string;
	};

	type Item = {
		id: string;
	};

	let items = $state<Item[]>([]);
	let { strDate }: Props = $props();

	$effect(() => {
		if (tasks.daily.has(strDate)) {
			items = tasks.daily
				.get(strDate)!
				// .filter((id) => tasks.data.has(id))
				.map((id) => ({ id }));
			// console.log(items);
		}
	});

	const flipDurationMs = 300;
	function handleDndConsider(e: CustomEvent<DndEvent<Item>>) {
		items = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent<DndEvent<Item>>) {
		// items = e.detail.items;
		updateDailyArrayOrder(e.detail.items.map((item) => item.id));
	}
	function addTask() {
		addNewTaskNow(items.length, dateFromStr(strDate));
	}
</script>

<ul
	use:dragHandleZone={{ items, flipDurationMs, dragDisabled: true }}
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
	class="flex flex-col items-center gap-1.5 pb-2 pt-4"
>
	{#each items as item (item.id)}
		<li
			animate:flip={{ duration: flipDurationMs }}
			class="flex w-full max-w-screen-sm items-center rounded border border-transparent bg-background/40 hover:border-border"
		>
			<div use:dragHandle class="mx-1 text-foreground/50 hover:text-foreground">
				<GripVertical class="size-6" />
			</div>
			<TaskItem taskId={item.id} />
		</li>
	{/each}
</ul>

{#if items.length > 0}
	<div class="flex w-full justify-center text-foreground/50 hover:text-foreground">
		<Button variant="ghost" class="flex items-center gap-1.5" onclick={addTask}>
			<Plus />
			<span>Add task</span>
		</Button>
	</div>
{/if}
