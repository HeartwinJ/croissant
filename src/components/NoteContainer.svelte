<script>
	import { onMount } from 'svelte';
	import { X } from '@inqling/svelte-icons';

	import EventTrap from '../scripts/EventTrap';
	import CornerResizeIcon from './CornerResizeIcon.svelte';

	export let offsetX;
	export let offsetY;
	export let height;
	export let width;

	const minimumSize = 120;

	let el;
	let grabAnchor;
	let isLoading = true;
	let isDragging = false;
	let cursorPos = { x: 0, y: 0 };
	let notePos = { x: 0, y: 0 };
	let noteSize = { width, height };

	function handleMouseDown(e) {
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
	}

	function handleResizeMouseDown(e) {
		cursorPos = EventTrap.handleDragStart(e, 1, handleResizeMouseMove, handleResizeMouseUp);
	}

	function handleResizeMouseMove(e) {
		noteSize = EventTrap.handleResize(e, { width, height }, cursorPos);
		updateSize();
	}

	function handleResizeMouseUp(e) {
		EventTrap.handleDragEnd(e);
		({ width, height } = noteSize);
	}

	onMount(() => {
		updatePosition();
		isLoading = false;
	});

	function updatePosition() {
		el.style.top = offsetY + 'px';
		el.style.left = offsetX + 'px';
	}

	function updateSize() {
		const _height = noteSize.height > minimumSize ? noteSize.height : minimumSize;
		const _width = noteSize.width > minimumSize ? noteSize.width : minimumSize;
		el.style.height = _height + 'px';
		el.style.width = _width + 'px';
	}
</script>

<div
	class="group absolute bg-neutral-800/70 backdrop-blur-lg rounded-lg p-2 flex flex-col gap-1 cursor-grab"
	class:cursor-grabbing={isDragging}
	class:scale-95={isDragging}
	class:hidden={isLoading}
	style:height={height + 'px'}
	style:width={width + 'px'}
	bind:this={el}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
>
	<span
		class="hidden group-hover:flex absolute right-0 top-0 m-1 p-1 rounded-md cursor-pointer bg-neutral-700/30 hover:bg-neutral-700/70"
	>
		<X class="h-4 w-4" />
	</span>
	<span
		class="hidden group-hover:flex absolute right-0 bottom-0 m-1 p-1 rounded-md cursor-se-resize bg-neutral-700/30 hover:bg-neutral-800/70"
		bind:this={grabAnchor}
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
