<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { downloadTasksData } from '$lib/store/tasks-storage-service.svelte';
</script>

<div class="flex flex-col items-center">
	<h1 class="mb-12 text-4xl">Manage your data</h1>

	<div class="flex flex-col items-center gap-6">
		<Button onclick={downloadTasksData} class="w-[300px]">Download data as JSON</Button>
		<Button onclick={downloadTasksData} class="w-[300px]">Upload JSON data</Button>
	</div>
</div>
