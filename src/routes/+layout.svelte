<script lang="ts">
	import LightSwitch from '$lib/components/ui/LightSwitch.svelte';
	import Wrapper from '$lib/components/ui/Wrapper.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>KeepUp</title>
</svelte:head>

<ModeWatcher />

<div class="bg-grid dark:bg-crow flex min-h-screen flex-col">
	<header class="p-8">
		<Wrapper class="flex items-center justify-between">
			<span>Keepup</span>

			<div class="flex items-center gap-6">
				<LightSwitch />
				<nav class="flex items-center gap-3">
					<a href="/config">Config</a>
					<a href="/about">About</a>
				</nav>
			</div>
		</Wrapper>
	</header>

	<main class="flex-1">
		<Wrapper>
			{@render children()}
		</Wrapper>
	</main>

	<footer>
		<Wrapper>
			<div class="text-center">Copyright &copy;2025</div>
		</Wrapper>
	</footer>
</div>
