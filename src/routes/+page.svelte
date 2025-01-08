<script lang="ts">
	import TaskItem from '$lib/components/TaskItem.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { addEmptyTask, addTask, tasks } from '$lib/store/tasks-store.svelte';
	import { Plus } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	function add() {
		addEmptyTask(1);
	}
</script>

<div class="my-2 flex justify-center">
	<Button variant="ghost" size="lg" class="flex justify-center gap-1.5 text-lg" on:click={add}>
		<Plus />
		<span>Add task</span>
	</Button>
</div>

<ul class="flex flex-col items-center gap-4 py-8">
	{#each tasks.data as task (task.id)}
		<li class="flex w-full justify-center" transition:fly>
			<TaskItem {task} />
		</li>
	{/each}
</ul>
