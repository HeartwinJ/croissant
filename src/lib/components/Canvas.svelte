<script>
	import { onMount } from "svelte";

	import { notes } from "$lib/stores";
	import EventTrap from "$lib/EventTrap";
	import Note from "$lib/components/Note/Note.svelte";
	import ContextMenu from "./ContextMenu/ContextMenu.svelte";

	let el;
	let controller;
	let offsetX;
	let offsetY;
	let showContextMenu = false;
	let canvasScale = 1;
	let cursorPos = { x: 0, y: 0 };
	let canvasPos = { x: 0, y: 0 };

	let menuConfig = {
		pos: { x: 230, y: 340 },
		options: [
			{
				text: "Create Note",
				onClick: (pos) => {
					notes.addNote({
						config: { offsetX: pos.x - offsetX, offsetY: pos.y - offsetY, height: 120, width: 240 },
						content: { title: "", type: "text", data: "" }
					});
					showContextMenu = false;
				}
			}
		]
	};

	$: computedNotes = $notes;

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

	function handleClick(e) {
		showContextMenu = false;
		document.activeElement.blur();
	}

	function handleContextMenu(e) {
		menuConfig.pos = EventTrap.handleContextMenu(e);
		showContextMenu = true;
	}

	function updatePosition() {
		el.style.top = offsetY + "px";
		el.style.left = offsetX + "px";
	}

	function handleMouseWheel(e) {
		canvasScale = EventTrap.handleScale(e, el, canvasScale);
	}

	onMount(() => {
		offsetX = document.body.clientWidth / 2;
		offsetY = document.body.clientHeight / 2;
		updatePosition();
		document.addEventListener("wheel", handleMouseWheel, { passive: false });
	});
</script>

{#if showContextMenu}
	<ContextMenu {...menuConfig} />
{/if}
<div class="relative h-0 w-0" bind:this={el}>
	{#each computedNotes as note (note._id)}
		<Note {...note} />
	{/each}
</div>
<div
	class="h-full w-full"
	bind:this={controller}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	on:contextmenu={handleContextMenu}
	on:click={handleClick}
/>
