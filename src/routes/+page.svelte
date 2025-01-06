<script lang="ts">
	import TaskCheck from '$lib/components/TaskCheck.svelte';
	import { tasks } from '$lib/store/tasks-store.svelte';

	const taskChecked = (checked: boolean, id: number) => {
		const task = tasks.find((t) => t.id === id);

		if (task) {
			task.done = checked;
		}
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div class="flex flex-col gap-4 py-8">
	{#each tasks as task (task.id)}
		<TaskCheck {task} onChecked={(checked) => taskChecked(checked, task.id)} />
	{/each}
</div>
