<script lang="ts">
	import TaskCheck from '$lib/components/TaskCheck.svelte';
	import { tasks } from '$lib/store/tasks-store.svelte';
	import AddForm from './AddForm.svelte';

	const taskChecked = (checked: boolean, id: number) => {
		const task = tasks.find((t) => t.id === id);

		if (task) {
			task.done = checked;
		}
	};
</script>

<AddForm />

<div class="flex flex-col gap-4 py-8">
	{#each tasks as task (task.id)}
		<TaskCheck {task} onChecked={(checked) => taskChecked(checked, task.id)} />
	{/each}
</div>
