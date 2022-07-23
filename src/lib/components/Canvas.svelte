<script>
	import { onMount } from "svelte";

	import { notes } from "$lib/stores";
	import EventTrap from "$lib/EventTrap";
	import Note from "$lib/components/Note.svelte";

	let el;
	let controller;
	let offsetX;
	let offsetY;
	let canvasScale = 1;
	let cursorPos = { x: 0, y: 0 };
	let canvasPos = { x: 0, y: 0 };

	function handleMouseDown(e) {
		cursorPos = EventTrap.handleDragStart(e, 2, handleMouseMove, handleMouseUp);
	}

	function handleMouseMove(e) {
		({ offsetX, offsetY } = EventTrap.handleDrag(e, el, canvasPos, cursorPos));
		updatePosition();
	}

	function handleMouseUp(e) {
		EventTrap.handleDragEnd(e);
	}

	function updatePosition() {
		el.style.top = offsetY + "px";
		el.style.left = offsetX + "px";
	}

	function handleMouseWheel(e) {
		canvasScale = EventTrap.handleScale(e, el, canvasScale);
	}

	onMount(() => {
		updatePosition();
		document.addEventListener("wheel", handleMouseWheel, { passive: false });
	});
</script>

<div class="relative top-1/2 left-1/2 h-0 w-0" bind:this={el}>
	{#each $notes as note}
		<Note {...note} />
	{/each}
</div>
<div
	class="h-full w-full"
	bind:this={controller}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
/>
