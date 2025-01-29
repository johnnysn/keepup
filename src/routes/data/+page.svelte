<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { appState } from '$lib/store/application-store.svelte';
	import {
		downloadTasksData,
		loadTasksFromJsonData
	} from '$lib/store/tasks-storage-service.svelte';
	import { toast } from 'svelte-sonner';

	let fileInput: HTMLInputElement;

	function handleFileUpload(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const file = event.currentTarget.files![0];
		if (file && file.type === 'application/json') {
			const reader = new FileReader();
			reader.onload = () => {
				try {
					// Parse the JSON file content
					appState.storageReady = false;
					loadTasksFromJsonData(reader.result as string);
					toast.success('Tasks data successfully uploaded!');
				} catch (e) {
					toast.error('Error reading or parsing the JSON file');
				} finally {
					appState.storageReady = true;
				}
			};
			reader.readAsText(file);
		} else {
			toast.error('Please upload a valid JSON file.');
		}
	}
</script>

<div class="flex flex-col items-center">
	<h1 class="mb-12 text-4xl">Manage your data</h1>

	<div class="flex flex-col items-center gap-6">
		<Button onclick={downloadTasksData} class="w-[300px]">Download data as JSON</Button>
		<Button onclick={() => fileInput.click()} class="w-[300px]">Upload JSON data</Button>

		<input
			type="file"
			accept=".json"
			bind:this={fileInput}
			style="display: none;"
			on:change={handleFileUpload}
		/>
	</div>
</div>
