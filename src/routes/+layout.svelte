<script lang="ts">
	import Wrapper from '$lib/components/ui/Wrapper.svelte';
	import { ModeWatcher, mode } from 'mode-watcher';
	import '../app.pcss';
	import Header from './Header.svelte';
	import { cn } from '$lib/utils';
	import { loadConfigFromLocalStorage } from '$lib/store/config-storage-service';
	import { config } from '$lib/store/config-store.svelte';
	import {
		loadTasksFromLocalStorage,
		saveTasksToLocalStorage
	} from '$lib/store/tasks-storage-service.svelte';
	import { createTasksForDate } from '$lib/store/tasks-store.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	let { children } = $props();

	let c = $state('');
	mode.subscribe((val) => (c = val === 'dark' ? 'dark' : ''));

	$effect(() => {
		loadConfigFromLocalStorage();
		loadTasksFromLocalStorage();

		// console.log('Loading recurrent tasks...');
		const toastId = toast('Loading recurrent tasks...');
		const id = setTimeout(() => {
			createTasksForDate(new Date());
			toast.success('Recurrent tasks loaded.', {
				id: toastId,
				duration: 500
			});
		}, 1000);
		return () => clearTimeout(id);
	});

	$effect(() => {
		const period = config.saveInterval;
		const interval = setInterval(saveTasksToLocalStorage, period);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>KeepUp</title>
</svelte:head>

<ModeWatcher />

<Toaster />

<div class="bg-grid dark:bg-crow flex min-h-screen flex-col">
	<Header />

	<main class={cn('flex-1', c)}>
		<Wrapper class="px-2 py-2 md:px-6">
			{@render children()}
		</Wrapper>
	</main>

	<footer>
		<Wrapper class="flex flex-col py-4">
			<div class="text-center">Copyright &copy;2025</div>
		</Wrapper>
	</footer>
</div>
