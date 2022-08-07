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
	let initialCursorPos = { x: 0, y: 0 };
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
		initialCursorPos = EventTrap.handleDragStart(e, 2, handleDrag, handleMouseUp);
	}

	function handleDrag(e) {
		({ offsetX, offsetY } = EventTrap.handleDrag(e, el, canvasPos, initialCursorPos));
		updatePosition();
	}

	function handleMouseUp(e) {
		EventTrap.handleDragEnd(e);
	}

	function handleMouseMove(e) {
		cursorPos = EventTrap.handleMouseMove(e);
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

	function handlePaste(e) {
		const URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
		const COLOR_REGEX =
			/(?:#|0x)(?:[a-f0-9]{3}|([a-f0-9]{6}([a-f0-9]{2})?))\b|(?:rgb|hsl)a?\([^\)]*\)/gi;
		EventTrap.handlePaste(e, async (data) => {
			if (URL_REGEX.test(data)) {
				if (data.indexOf(".jpg") > 0 || data.indexOf(".png") > 0 || data.indexOf(".gif") > 0) {
					notes.addNote({
						config: {
							offsetX: cursorPos.x - offsetX,
							offsetY: cursorPos.y - offsetY,
							height: 120,
							width: 240
						},
						content: { title: "", type: "image", data: { src: data, alt: "" } }
					});
				} else if (data.indexOf(".mp4") > 0) {
					notes.addNote({
						config: {
							offsetX: cursorPos.x - offsetX,
							offsetY: cursorPos.y - offsetY,
							height: 120,
							width: 240
						},
						content: { title: "", type: "video", data: { src: data } }
					});
				} else {
					const isImage = await new Promise((resolve) => {
						const image = new Image();
						image.src = data;

						image.addEventListener("load", () => resolve(true));
						image.addEventListener("error", () => resolve(false));
					});

					if (isImage) {
						notes.addNote({
							config: {
								offsetX: cursorPos.x - offsetX,
								offsetY: cursorPos.y - offsetY,
								height: 120,
								width: 240
							},
							content: { title: "", type: "image", data: { src: data, alt: "" } }
						});
					} else {
						notes.addNote({
							config: {
								offsetX: cursorPos.x - offsetX,
								offsetY: cursorPos.y - offsetY,
								height: 120,
								width: 240
							},
							content: { title: "", type: "web", data: data }
						});
					}
				}
			} else if (data.startsWith("data:image")) {
				notes.addNote({
					config: {
						offsetX: cursorPos.x - offsetX,
						offsetY: cursorPos.y - offsetY,
						height: 120,
						width: 240
					},
					content: { title: "", type: "image", data: { src: data, alt: "" } }
				});
			} else if (COLOR_REGEX.test(data)) {
				notes.addNote({
					config: {
						offsetX: cursorPos.x - offsetX,
						offsetY: cursorPos.y - offsetY,
						height: 120,
						width: 120
					},
					content: { title: "", type: "swatch", data: data }
				});
			} else {
				notes.addNote({
					config: {
						offsetX: cursorPos.x - offsetX,
						offsetY: cursorPos.y - offsetY,
						height: 120,
						width: 240
					},
					content: { title: "", type: "text", data: data }
				});
			}
		});
	}

	onMount(() => {
		offsetX = document.body.clientWidth / 2;
		offsetY = document.body.clientHeight / 2;
		updatePosition();
		document.addEventListener("wheel", handleMouseWheel, { passive: false });
		document.addEventListener("paste", handlePaste);
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
	on:mousemove={handleMouseMove}
	on:contextmenu|preventDefault={handleContextMenu}
	on:click={handleClick}
/>
