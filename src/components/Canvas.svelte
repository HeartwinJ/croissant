<script>
	import { onMount } from 'svelte';
	import Note from './Note.svelte';

	let el;
	let offsetX;
	let offsetY;
	let cursorPos = { x: 0, y: 0 };
	let canvasPos = { x: 0, y: 0 };

	function handleMouseDown(e) {
		console.log('Mouse Down');
		e = e || window.event;
		e.preventDefault();
		cursorPos.x = e.clientX;
		cursorPos.y = e.clientY;

		document.onmouseup = handleMouseUp;
		document.onmousemove = handleMouseMove;
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

	onMount(() => {
		updatePosition();
	});
</script>

<div class="relative" bind:this={el}>
	<Note offsetX={800} offsetY={500} height={250} width={400} />
	<Note offsetX={650} offsetY={100} height={250} width={400} />
	<Note offsetX={240} offsetY={650} height={250} width={400} />
	<Note offsetX={1200} offsetY={700} height={250} width={400} />
	<Note offsetX={0} offsetY={0} height={250} width={400} />
</div>
<div class="h-full w-full" on:mousedown={handleMouseDown} on:mouseup={handleMouseUp} />
