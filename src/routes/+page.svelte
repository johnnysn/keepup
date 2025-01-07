<script lang="ts">
	import TaskItem from '$lib/components/TaskItem.svelte';
	import { tasks } from '$lib/store/tasks-store.svelte';
	import AddForm from './AddForm.svelte';
	import { fly } from 'svelte/transition';
</script>

<AddForm />

<ul class="flex flex-col gap-4 py-8">
	{#each tasks.data as task (task.id)}
		<li transition:fly>
			<TaskItem {task} />
		</li>
	{/each}
</ul>
