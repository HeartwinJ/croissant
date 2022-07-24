<script>
	import { onMount } from "svelte";
	import MenuOption from "./MenuOption.svelte";

	export let pos;
	export let options;

	let menuEl;

	$: updatePosition(pos);

	function updatePosition(_pos = pos) {
		if (!menuEl) return;

		menuEl.style.top = _pos.y + "px";
		menuEl.style.left = _pos.x + "px";
	}

	onMount(() => {
		updatePosition();
	});
</script>

<div class="absolute z-50 bg-neutral-800 p-2 rounded-lg" bind:this={menuEl}>
	{#each options as option}
		<MenuOption {...option} bind:menuPos={pos} />
	{/each}
</div>
