<script lang="ts">
	import TaskItem from '$lib/components/TaskItem.svelte';
	import TaskList from '$lib/components/TaskList.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { addNewTaskNow, tasks } from '$lib/store/tasks-store.svelte';
	import type { Task } from '$lib/types/task';
	import { formatDate } from '$lib/utils';
	import { Plus } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	function add() {
		addNewTaskNow();
	}

	let todayArray = $state<Task[]>([]);

	$effect(() => {
		const strDate = formatDate(new Date());

		if (tasks.daily.has(strDate)) {
			todayArray = tasks.daily.get(strDate)!.map((id) => tasks.data.get(id)!);
		}
	});
</script>

<div class="my-2 flex justify-center">
	<Button variant="ghost" size="lg" class="flex justify-center gap-1.5 text-lg" on:click={add}>
		<Plus />
		<span>Add task</span>
	</Button>
</div>

<TaskList />
