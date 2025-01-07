<script lang="ts">
	import Wrapper from '$lib/components/ui/Wrapper.svelte';
	import { ModeWatcher, mode } from 'mode-watcher';
	import '../app.pcss';
	import Header from './Header.svelte';
	import { cn } from '$lib/utils';
	let { children } = $props();

	let c = $state('');
	mode.subscribe((val) => (c = val === 'dark' ? 'dark' : ''));
</script>

<svelte:head>
	<title>KeepUp</title>
</svelte:head>

<ModeWatcher />

<div class="bg-grid dark:bg-crow flex min-h-screen flex-col">
	<Header />

	<main class={cn('flex-1', c)}>
		<Wrapper class="px-2 py-2 md:px-6">
			{@render children()}
		</Wrapper>
	</main>

	<footer>
		<Wrapper class="py-4">
			<div class="text-center">Copyright &copy;2025</div>
		</Wrapper>
	</footer>
</div>
