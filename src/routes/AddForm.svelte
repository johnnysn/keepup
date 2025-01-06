<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
</script>

<form action="">
	<div class="flex flex-col gap-1">
		<Label>Name of the task</Label>
		<Input name="name" placeholder="Enter a new task..." class="max-w-xs" />
	</div>
</form>
