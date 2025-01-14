<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dragHandleZone, dragHandle } from 'svelte-dnd-action';
	import type { Task } from '$lib/types/task';
	import { formatDate } from '$lib/utils';
	import { tasks } from '$lib/store/tasks-store.svelte';
	import TaskItem from './TaskItem.svelte';
	import { GripVertical } from 'lucide-svelte';

	let items = $state<Task[]>([]);

	$effect(() => {
		const strDate = formatDate(new Date());

		if (tasks.daily.has(strDate)) {
			items = tasks.daily.get(strDate)!.map((id) => tasks.data.get(id)!);
		}
	});

	const flipDurationMs = 300;
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
</script>

<ul
	use:dragHandleZone={{ items, flipDurationMs }}
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
	class="flex flex-col items-center gap-2 py-8"
>
	{#each items as item (item.id)}
		<li
			animate:flip={{ duration: flipDurationMs }}
			class="flex w-full max-w-screen-sm items-center rounded border border-transparent bg-background/40 hover:border-border"
		>
			<div use:dragHandle class="mx-1 text-foreground/50 hover:text-foreground">
				<GripVertical class="size-6" />
			</div>
			<TaskItem task={item} />
		</li>
	{/each}
</ul>
