<script>
	import Wrapper from '$lib/ui/Wrapper.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>KeepUp</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
	<header class="h-16">
		<Wrapper class="flex justify-between">
			<div>KeepUp</div>

			<nav>
				<a href="/about">About</a>
			</nav>
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
