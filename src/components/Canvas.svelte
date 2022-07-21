<script>
	import { onMount } from 'svelte';
	import Note from './Note.svelte';

	import EventTrap from '../scripts/EventTrap';

	let el;
	let controller;
	let offsetX;
	let offsetY;
	let canvasScale = 1;
	let cursorPos = { x: 0, y: 0 };
	let canvasPos = { x: 0, y: 0 };

	const notes = [
		{
			config: {
				offsetX: 800,
				offsetY: 500,
				height: 400,
				width: 400
			},
			content: {
				title: 'Test Title',
				type: 'text',
				data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam, nibh ut lacinia porta, lectus elit hendrerit eros, pharetra scelerisque orci diam id tortor. Duis viverra sapien erat, sit amet pulvinar diam interdum eu. Phasellus posuere neque ut felis tristique, non feugiat sem malesuada. Aliquam mauris quam, pulvinar non est nec, laoreet eleifend erat. Quisque augue urna, sagittis a facilisis tempus, suscipit a nulla. Praesent vestibulum nisi eget lectus iaculis ornare. Mauris tellus urna, pharetra nec aliquet ut, scelerisque ut lLorem. Proin eget enim auctor, aliquam massa sit amet, fringilla velit. Proin placerat at ipsum sed porta. Nullam finibus ut nibh et laoreet.'
			}
		},
		{
			config: {
				offsetX: 650,
				offsetY: 100,
				height: 250,
				width: 400
			},
			content: {
				title: 'Test Title',
				type: 'image',
				data: {
					src: 'https://silwesrqxrdvoowawunc.supabase.co/storage/v1/object/public/media/initial/z8f3mo',
					alt: 'Beach'
				}
			}
		},
		{
			config: {
				offsetX: 240,
				offsetY: 650,
				height: 250,
				width: 400
			},
			content: {
				title: 'Test Title',
				type: 'image',
				data: {
					src: 'https://media1.giphy.com/media/3og0IGjLXRttYbbtcc/giphy.gif?cid=ecf05e47fgqcdczq44aklkoy276vdrrghlmuddmrjd2buuvc&rid=giphy.gif&ct=g',
					alt: ''
				}
			}
		},
		{
			config: {
				offsetX: 1200,
				offsetY: 700,
				height: 650,
				width: 400
			},
			content: {
				title: 'Test Title',
				type: 'image',
				data: {
					src: 'https://silwesrqxrdvoowawunc.supabase.co/storage/v1/object/public/media/initial/1uqtkf',
					alt: 'Horizon'
				}
			}
		},
		{
			config: {
				offsetX: 120,
				offsetY: 680,
				height: 150,
				width: 150
			},
			content: {
				title: 'Test Title',
				type: 'swatch',
				data: 'rgb(0, 145, 255)'
			}
		},
		{
			config: {
				offsetX: 20,
				offsetY: 20,
				height: 400,
				width: 400
			},
			content: {
				title: 'Test Title',
				type: 'text',
				data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam, nibh ut lacinia porta, lectus elit hendrerit eros, pharetra scelerisque orci diam id tortor. Duis viverra sapien erat, sit amet pulvinar diam interdum eu. Phasellus posuere neque ut felis tristique, non feugiat sem malesuada. Aliquam mauris quam, pulvinar non est nec, laoreet eleifend erat. Quisque augue urna, sagittis a facilisis tempus, suscipit a nulla. Praesent vestibulum nisi eget lectus iaculis ornare. Mauris tellus urna, pharetra nec aliquet ut, scelerisque ut lLorem. Proin eget enim auctor, aliquam massa sit amet, fringilla velit. Proin placerat at ipsum sed porta. Nullam finibus ut nibh et laoreet.'
			}
		},
		{
			config: {
				offsetX: 220,
				offsetY: 240,
				height: 80,
				width: 100
			},
			content: {
				type: 'invalid',
				data: null
			}
		}
	];

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
		el.style.top = offsetY + 'px';
		el.style.left = offsetX + 'px';
	}

	function handleMouseWheel(e) {
		canvasScale = EventTrap.handleScale(e, el, canvasScale);
	}

	onMount(() => {
		updatePosition();
		document.addEventListener('wheel', handleMouseWheel, { passive: false });
	});
</script>

<div class="relative origin-top-left" bind:this={el}>
	{#each notes as note}
		<Note {...note} />
	{/each}
</div>
<div
	class="h-full w-full"
	bind:this={controller}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
/>
