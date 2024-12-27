<script>
	let clazz = '';
	export { clazz as class };
</script>

<div class="w-full">
	<div class={`w-full max-w-screen-xl mx-auto px-2 md:px-6 py-2 ${clazz}`}>
		<slot />
	</div>
</div>
