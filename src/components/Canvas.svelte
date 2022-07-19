<script>
	import { onMount } from 'svelte';
	import Note from './Note.svelte';

	let el;
	let controller;
	let offsetX;
	let offsetY;
	let canvasScale = 5;
	let cursorPos = { x: 0, y: 0 };
	let canvasPos = { x: 0, y: 0 };

	const notes = [
		{
			offsetX: 800,
			offsetY: 500,
			height: 250,
			width: 400
		},
		{
			offsetX: 650,
			offsetY: 100,
			height: 250,
			width: 400
		},
		{
			offsetX: 240,
			offsetY: 650,
			height: 250,
			width: 400
		},
		{
			offsetX: 1200,
			offsetY: 700,
			height: 250,
			width: 400
		},
		{
			offsetX: 20,
			offsetY: 20,
			height: 250,
			width: 400
		}
	];

	function handleMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		cursorPos.x = e.clientX;
		cursorPos.y = e.clientY;

		if (e.which == 2) {
			document.onmouseup = handleMouseUp;
			document.onmousemove = handleMouseMove;

			el.style.cursor = 'pointer';
		}
	}

	function handleMouseMove(e) {
		e = e || window.event;
		e.preventDefault();

		canvasPos.x = cursorPos.x - e.clientX;
		canvasPos.y = cursorPos.y - e.clientY;
		cursorPos.x = e.clientX;
		cursorPos.y = e.clientY;

		offsetX = el.offsetLeft - canvasPos.x;
		offsetY = el.offsetTop - canvasPos.y;

		updatePosition();
	}

	function handleMouseUp(e) {
		document.onmouseup = null;
		document.onmousemove = null;
	}

	function updatePosition() {
		el.style.top = offsetY + 'px';
		el.style.left = offsetX + 'px';
	}

	function handleMouseWheel(e) {
		if (e.ctrlKey) {
			e.preventDefault();
			if (e.deltaY > 0) {
				canvasScale = canvasScale - 0.1;
				if (canvasScale < 0.5) canvasScale = 0.5;
			} else {
				canvasScale = canvasScale + 0.1;
				if (canvasScale > 2) canvasScale = 2;
			}
			el.style.transform = `scale(${canvasScale})`;
		}
	}

	onMount(() => {
		updatePosition();
		document.addEventListener('wheel', handleMouseWheel, { passive: false });
	});
</script>

<div class="relative origin-top-left" bind:this={el}>
	{#each notes as note}
		<Note bind:noteData={note} />
	{/each}
</div>
<div
	class="h-full w-full"
	bind:this={controller}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
/>
