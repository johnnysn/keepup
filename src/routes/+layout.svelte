<script lang="ts">
	import LightSwitch from '$lib/components/ui/LightSwitch.svelte';
	import Wrapper from '$lib/components/ui/Wrapper.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Header from './Header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>KeepUp</title>
</svelte:head>

<ModeWatcher />

<div class="bg-grid dark:bg-crow flex min-h-screen flex-col">
	<Header />

	<main class="flex-1">
		<Wrapper>
			{@render children()}
		</Wrapper>
	</main>

	<footer>
		<Wrapper class="py-4">
			<div class="text-center">Copyright &copy;2025</div>
		</Wrapper>
	</footer>
</div>
