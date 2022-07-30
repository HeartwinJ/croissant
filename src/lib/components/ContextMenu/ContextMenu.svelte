<script>
	import { onMount } from "svelte";
	import MenuOption from "./MenuOption.svelte";
	import { contextMenu } from "$lib/stores";

	let menuEl;

	$: updatePosition($contextMenu.pos);

	function updatePosition(_pos) {
		if (!menuEl) return;

		menuEl.style.top = _pos.y + "px";
		menuEl.style.left = _pos.x + "px";
	}

	onMount(() => {
		updatePosition($contextMenu.pos);
	});
</script>

<div class="fixed z-50 bg-neutral-800 p-2 rounded-lg" bind:this={menuEl}>
	{#each $contextMenu.options as option}
		<MenuOption {...option} menuPos={$contextMenu.pos} />
	{/each}
</div>
