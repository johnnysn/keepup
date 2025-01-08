<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { addTask } from '$lib/store/tasks-store.svelte';

	let name = $state('');
	let description = $state('');
	let recurrent = $state(false);

	function submit() {
		addTask({
			name,
			description,
			recurrent
		});
	}
</script>

<div class="flex flex-col gap-2">
	<Input
		name="name"
		type="text"
		placeholder="Enter a new task..."
		class="md:max-w-xs"
		bind:value={name}
	/>
	<Input
		name="description"
		type="text"
		placeholder="Enter a description..."
		class="md:max-w-xs"
		bind:value={description}
	/>
	<div class="flex items-center gap-2">
		<Checkbox id="chkRecurrent" bind:checked={recurrent} />
		<Label for="chkRecurrent">Recurrent</Label>
	</div>
	<Button class="md:max-w-xs" on:click={submit}>Create</Button>
</div>
