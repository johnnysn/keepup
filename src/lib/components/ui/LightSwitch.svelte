<script lang="ts">
	import { Switch } from '$lib/components/ui/switch';
	import Moon from 'lucide-svelte/icons/moon';

	import { mode, setMode } from 'mode-watcher';

	let checked = $mode == 'dark';

	$: {
		setMode(checked ? 'dark' : 'light');
	}
</script>

<div class="flex items-center gap-1">
	<Switch bind:checked />
	<div>
		<Moon class="size-6" />
	</div>
</div>
