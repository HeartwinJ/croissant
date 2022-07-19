<script>
	import { onMount } from 'svelte';
	import { X } from '@inqling/svelte-icons';

	export let offsetX;
	export let offsetY;
	export let height;
	export let width;

	let el;
	let isLoading = true;
	let isDragging = false;
	let cursorPos = { x: 0, y: 0 };
	let notePos = { x: 0, y: 0 };

	function handleMouseDown(e) {
		isDragging = true;
		e = e || window.event;
		e.preventDefault();
		cursorPos.x = e.clientX;
		cursorPos.y = e.clientY;

		if (e.which == 1) {
			document.onmouseup = handleMouseUp;
			document.onmousemove = handleMouseMove;
		}
	}

	function handleMouseMove(e) {
		e = e || window.event;
		e.preventDefault();

		notePos.x = cursorPos.x - e.clientX;
		notePos.y = cursorPos.y - e.clientY;
		cursorPos.x = e.clientX;
		cursorPos.y = e.clientY;

		offsetX = el.offsetLeft - notePos.x;
		offsetY = el.offsetTop - notePos.y;

		updatePosition();
	}

	function handleMouseUp(e) {
		document.onmouseup = null;
		document.onmousemove = null;
		isDragging = false;
	}

	onMount(() => {
		updatePosition();
		isLoading = false;
	});

	function updatePosition() {
		el.style.top = offsetY + 'px';
		el.style.left = offsetX + 'px';
	}
</script>

<div
	class="absolute bg-neutral-800 p-2 inline-flex flex-col cursor-grab"
	class:cursor-grabbing={isDragging}
	class:scale-95={isDragging}
	class:hidden={isLoading}
	style:min-height={height + 'px'}
	style:width={width + 'px'}
	bind:this={el}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
>
	<div class="flex justify-end mb-2">
		<X class="h-3" />
	</div>
	<slot />
</div>
