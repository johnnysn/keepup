<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { type Task } from '$lib/types/task';

	type Props = {
		task: Task;
		onChecked: (checked: boolean) => void;
	};

	const { task, onChecked }: Props = $props();
	const id = `chk${task.id}`;
	const labelClass = `${task.done ? 'line-through' : ''}`;
</script>

<div class="items-top flex space-x-2">
	<Checkbox {id} onCheckedChange={(checked) => onChecked(!!checked)} checked={task.done} />
	<div class="grid items-center gap-1.5 leading-none">
		<Label
			for={id}
			class={`text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${labelClass}`}
		>
			{task.name}
		</Label>
		{#if task.description}
			<p class="text-muted-foreground text-sm">
				{task.description}
			</p>
		{/if}
	</div>
</div>
