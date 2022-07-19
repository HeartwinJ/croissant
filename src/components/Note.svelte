<script>
	import { onMount } from 'svelte';
	import { X } from '@inqling/svelte-icons';

	export let offsetX;
	export let offsetY;
	export let height;
	export let width;

	let el;
	let isLoading = true;
	let cursorPos = { x: 0, y: 0 };
	let notePos = { x: 0, y: 0 };

	function handleMouseDown(e) {
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
	<div class="bg-neutral-900 p-2 max-w-md cursor-auto">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget egestas arcu, at
		luctus metus. Donec ornare facilisis tellus ac tempus. Vivamus congue quam ipsum, eu accumsan
		tortor interdum vitae. Donec tristique odio tortor, vel rhoncus sapien auctor non. Ut mollis
		metus vitae lectus consectetur, eget hendrerit diam aliquet. Suspendisse eleifend, dolor eget
		malesuada vulputate, odio diam interdum purus, sed ultrices ipsum nisi at eros. Proin tempor
		interdum libero, vitae mattis quam placerat id. Duis faucibus velit ligula, et luctus tellus
		imperdiet non. Aenean posuere volutpat leo et commodo. Fusce at porta velit. Nulla vulputate
		interdum lectus vitae mollis.
	</div>
</div>
