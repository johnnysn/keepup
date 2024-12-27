<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	const { name, description } = $props();
</script>

<div class="items-top flex space-x-2">
	<Checkbox id="terms1" />
	<div class="grid gap-1.5 leading-none">
		<Label
			for="terms1"
			class="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			{name}
		</Label>
		{#if description}
			<p class="text-muted-foreground text-sm">
				{description}
			</p>
		{/if}
	</div>
</div>
