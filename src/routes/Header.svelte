<script lang="ts">
	import LightSwitch from '$lib/components/ui/LightSwitch.svelte';
	import Wrapper from '$lib/components/ui/Wrapper.svelte';
</script>

<header>
	<Wrapper class="my-2 flex items-center justify-between border ">
		<a href="/"><img src="/KeepupTop.jpeg" height="84px" alt="Keepup logo" /></a>

		<div class="flex items-center gap-6 py-4 pr-2 md:pr-6">
			<LightSwitch />
			<nav class="flex items-center gap-3">
				<a href="/config">Config</a>
				<a href="/about">About</a>
			</nav>
		</div>
	</Wrapper>
</header>
