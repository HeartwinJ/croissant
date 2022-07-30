<script>
	import { onMount, createEventDispatcher } from "svelte";
	import { X } from "@inqling/svelte-icons";

	import EventTrap from "$lib/EventTrap";
	import CornerResizeIcon from "$lib/components/CornerResizeIcon.svelte";

	import { contextMenu } from "$lib/stores";

	const minimumSize = 120;
	const dispatch = createEventDispatcher();

	export let offsetX;
	export let offsetY;
	export let height = minimumSize;
	export let width = minimumSize;

	let el;
	let isLoading = true;
	let isDragging = false;
	let cursorPos = { x: 0, y: 0 };
	let notePos = { x: 0, y: 0 };
	let initialSize = { height, width };

	function handleMouseDown(e) {
		contextMenu.hide();
		isDragging = true;
		cursorPos = EventTrap.handleDragStart(e, 1, handleMouseMove, handleMouseUp);
	}

	function handleMouseMove(e) {
		({ offsetX, offsetY } = EventTrap.handleDrag(e, el, notePos, cursorPos));
		updatePosition();
	}

	function handleMouseUp(e) {
		EventTrap.handleDragEnd(e);
		isDragging = false;
		dispatch("update", { offsetX, offsetY, height, width });
	}

	function handleResizeMouseDown(e) {
		cursorPos = EventTrap.handleDragStart(e, 1, handleResizeMouseMove, handleResizeMouseUp);
	}

	function handleResizeMouseMove(e) {
		({ width, height } = EventTrap.handleResize(e, initialSize, cursorPos));
		updateSize();
	}

	function handleResizeMouseUp(e) {
		EventTrap.handleDragEnd(e);
		initialSize = { height, width };
		dispatch("update", { offsetX, offsetY, height, width });
	}

	function handleDelete(e) {
		e.preventDefault();
		e.stopPropagation();
		dispatch("delete");
	}

	function handleContextMenu(e) {
		dispatch("contextmenu", { x: e.clientX, y: e.clientY });
	}

	onMount(() => {
		updatePosition();
		isLoading = false;
	});

	function updatePosition() {
		el.style.top = offsetY + "px";
		el.style.left = offsetX + "px";
	}

	function updateSize() {
		width = width < minimumSize ? minimumSize : width;
		height = height < minimumSize ? minimumSize : height;
		el.style.height = height + "px";
		el.style.width = width + "px";
	}
</script>

<div
	class="group absolute bg-neutral-800/70 backdrop-blur-lg rounded-lg p-2 flex flex-col gap-1 cursor-grab"
	class:cursor-grabbing={isDragging}
	class:scale-95={isDragging}
	class:hidden={isLoading}
	style:height={height + "px"}
	style:width={width + "px"}
	bind:this={el}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	on:contextmenu|preventDefault={handleContextMenu}
>
	<span
		class="hidden group-hover:flex absolute right-0 top-0 m-1 p-1 rounded-md cursor-pointer bg-neutral-700/30 hover:bg-neutral-700/70"
		on:click={handleDelete}
	>
		<X class="h-4 w-4" />
	</span>
	<span
		class="hidden group-hover:flex absolute right-0 bottom-0 m-1 p-1 rounded-md cursor-se-resize bg-neutral-700/30 hover:bg-neutral-800/70"
		on:mousedown={handleResizeMouseDown}
		on:mouseup={handleResizeMouseUp}
	>
		<CornerResizeIcon class="h-5 w-5" />
	</span>
	<slot name="title" />
	<div class="grow rounded-lg overflow-hidden">
		<slot />
	</div>
</div>
