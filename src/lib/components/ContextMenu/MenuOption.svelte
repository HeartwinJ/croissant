<script>
	export let text;
	export let onClick;
	export let menuPos;

	function handleClick(e) {
		onClick(menuPos);
	}
</script>

<div class="py-2 px-4 hover:bg-neutral-700/50 select-none rounded-lg" on:click={handleClick}>
	{text}
</div>
