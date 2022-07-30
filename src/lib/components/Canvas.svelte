<script>
	import { onMount } from "svelte";

	import { notes, contextMenu } from "$lib/stores";
	import EventTrap from "$lib/EventTrap";
	import Note from "$lib/components/Note/Note.svelte";
	import ContextMenu from "$lib/components/ContextMenu/ContextMenu.svelte";

	let el;
	let offsetX;
	let offsetY;
	let canvasScale = 1;
	let cursorPos = { x: 0, y: 0 };
	let canvasPos = { x: 0, y: 0 };

	let menuConfig = {
		isVisible: false,
		pos: { x: 0, y: 0 },
		options: [
			{
				text: "Create Note",
				onClick: (pos) => {
					notes.addNote({
						config: { offsetX: pos.x - offsetX, offsetY: pos.y - offsetY, height: 120, width: 240 },
						content: { title: "", type: "text", data: "" }
					});
					contextMenu.hide();
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
		contextMenu.hide();
		document.activeElement.blur();
	}

	function handleContextMenu(e) {
		menuConfig.pos = { x: e.clientX, y: e.clientY };
		contextMenu.show(menuConfig);
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

{#if $contextMenu.isVisible}
	<ContextMenu />
{/if}

<div class="relative h-0 w-0" bind:this={el}>
	{#each computedNotes as note (note._id)}
		<Note {...note} />
	{/each}
</div>

<div
	class="h-full w-full"
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	on:contextmenu|preventDefault={handleContextMenu}
	on:click={handleClick}
/>
