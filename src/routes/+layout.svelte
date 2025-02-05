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
	import { createRecurrentTasks } from '$lib/store/tasks-store.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import { appState } from '$lib/store/application-store.svelte';
	let { children } = $props();

	let c = $state('');
	mode.subscribe((val) => (c = val === 'dark' ? 'dark' : ''));

	/// Load tasks from local storage
	$effect(() => {
		loadConfigFromLocalStorage();
		loadTasksFromLocalStorage();
		appState.storageReady = true;
	});

	/// Generate recurrent tasks
	$effect(() => {
		let id: number | undefined;

		if (appState.storageReady) {
			const toastId = toast('Loading recurrent tasks...');
			id = setTimeout(() => {
				createRecurrentTasks(new Date());
				appState.recurrentReady = true;
				toast.success('Recurrent tasks loaded.', {
					id: toastId,
					duration: 500
				});
			}, 1000);
		}

		return () => {
			if (id) clearTimeout(id);
		};
	});

	/// Save the tasks state periodically to the local storage
	$effect(() => {
		let interval: number | undefined;
		if (appState.storageReady && appState.recurrentReady) {
			const period = config.saveInterval;
			interval = setInterval(saveTasksToLocalStorage, period);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
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
