<script>
	import LightSwitch from '$lib/components/ui/LightSwitch.svelte';
	import Wrapper from '$lib/components/ui/Wrapper.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<svelte:head>
	<title>KeepUp</title>
</svelte:head>

<ModeWatcher />

<div class="flex flex-col min-h-screen">
	<header class="h-16">
		<Wrapper class="flex justify-between items-center">
			<div>KeepUp</div>

			<div class="flex items-center gap-12">
				<LightSwitch />
				<nav>
					<a href="/about">About</a>
				</nav>
			</div>
		</Wrapper>
	</header>

	<main class="flex-1">
		<Wrapper>
			<slot />
		</Wrapper>
	</main>

	<footer>
		<Wrapper>
			<div class="text-center">Copyright &copy;2024</div>
		</Wrapper>
	</footer>
</div>
