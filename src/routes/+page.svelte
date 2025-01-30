<script lang="ts">
	import { addNewTaskNow } from '$lib/store/tasks-store.svelte';
	import { goto } from '$app/navigation';
	import { formatDate } from '$lib/utils';

	function add() {
		addNewTaskNow(0);
	}

	$effect(() => {
		const content = localStorage.getItem('tasksState');
		if (content) {
			goto(`/tasks/${formatDate(new Date())}`);
		}
	});
</script>

<h1 class="mb-8 text-3xl font-bold">Hello, my friend!</h1>

Please, start adding tasks to your day
<a href={`/tasks/${formatDate(new Date())}`}>now</a>!
