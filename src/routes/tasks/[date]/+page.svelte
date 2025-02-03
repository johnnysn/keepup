<script lang="ts">
	import TaskList from '$lib/components/TaskList.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		addEmptyDate,
		addNewTaskNow,
		createTasksForDate,
		tasks
	} from '$lib/store/tasks-store.svelte';
	import type { Task } from '$lib/types/task';
	import { Plus, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { page } from '$app/state';
	import { dateFromStr, formatBasedOnLocale, formatDate } from '$lib/utils';
	import { goto } from '$app/navigation';

	function add() {
		addNewTaskNow(0);
	}

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	const strTomorrow = formatDate(tomorrow);

	let currArray = $state<Task[]>([]);
	let strDate = $derived(page.params.date);
	let formattedDate = $derived(formatBasedOnLocale(new Date(page.params.date)));
	let canGoForward = $derived(strDate !== strTomorrow);

	$effect(() => {
		if (tasks.daily.has(strDate)) {
			currArray = tasks.daily.get(strDate)!.map((id) => tasks.data.get(id)!);
		} else {
			const today = new Date();
			const date = dateFromStr(strDate);
			if (today.getTime() > date.getTime()) {
				addEmptyDate(strDate);
				currArray = tasks.daily.get(strDate)!.map((id) => tasks.data.get(id)!);
			} else if (strDate === strTomorrow) {
				createTasksForDate(tomorrow);
				currArray = tasks.daily.get(strDate)!.map((id) => tasks.data.get(id)!);
			}
		}
	});

	function forward() {
		const currDate = dateFromStr(strDate);

		const next = dateFromStr(strDate);
		next.setDate(currDate.getDate() + 1);
		const strNext = formatDate(next);

		goto(`/tasks/${strNext}`);
	}

	function backward() {
		const currDate = dateFromStr(strDate);

		const next = dateFromStr(strDate);
		next.setDate(currDate.getDate() - 1);
		const strNext = formatDate(next);

		goto(`/tasks/${strNext}`);
	}
</script>

<div class="flex items-center justify-center gap-16">
	<Button variant="outline" size="icon" onclick={backward}>
		<ChevronLeft class="h-4 w-4" />
	</Button>
	<span>{formattedDate}</span>
	<Button
		class={`${canGoForward ? '' : 'invisible'}`}
		variant="outline"
		size="icon"
		onclick={forward}
	>
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
