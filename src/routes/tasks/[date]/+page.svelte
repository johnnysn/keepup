<script lang="ts">
	import TaskList from '$lib/components/TaskList.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { addNewTaskNow, tasks } from '$lib/store/tasks-store.svelte';
	import type { Task } from '$lib/types/task';
	import { Plus, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { page } from '$app/state';
	import { formatBasedOnLocale } from '$lib/utils';

	function add() {
		addNewTaskNow(0);
	}

	let todayArray = $state<Task[]>([]);
	let strDate = $derived(page.params.date);
	let formattedDate = $derived(formatBasedOnLocale(new Date(page.params.date)));

	$effect(() => {
		if (tasks.daily.has(strDate)) {
			todayArray = tasks.daily.get(strDate)!.map((id) => tasks.data.get(id)!);
		}
	});
</script>

<div class="flex items-center justify-center gap-16">
	<Button variant="outline" size="icon">
		<ChevronLeft class="h-4 w-4" />
	</Button>
	<span>{formattedDate}</span>
	<Button variant="outline" size="icon">
		<ChevronRight class="h-4 w-4" />
	</Button>
</div>

<div class="mt-2 flex justify-center">
	<Button variant="ghost" size="lg" class="flex justify-center gap-1.5 text-lg" on:click={add}>
		<Plus />
		<span>Add task</span>
	</Button>
</div>

<TaskList {strDate} />
