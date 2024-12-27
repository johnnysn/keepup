<script lang="ts">
	import TaskCheck from '$lib/components/TaskCheck.svelte';

	const task1 = {
		id: 1,
		name: 'Do homework',
		description: 'I have a few math problems to finish',
		done: false,
		date: new Date()
	};

	const task2 = {
		id: 2,
		name: 'Workout',
		done: true,
		date: new Date()
	};

	const tasks = $state([task1, task2]);

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
