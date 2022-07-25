<script>
	import { createEventDispatcher } from "svelte";

	import InvalidContent from "$lib/components/Note/ContentTypes/InvalidContent.svelte";
	import TextContent from "$lib/components/Note/ContentTypes/TextContent.svelte";
	import ImageContent from "$lib/components/Note/ContentTypes/ImageContent.svelte";
	import SwatchContent from "$lib/components/Note/ContentTypes/SwatchContent.svelte";
	import VideoContent from "$lib/components/Note/ContentTypes/VideoContent.svelte";
	import AudioContent from "$lib/components/Note/ContentTypes/AudioContent.svelte";
	import WebContent from "$lib/components/Note/ContentTypes/WebContent.svelte";

	export let data;
	export let type;

	const dispatch = createEventDispatcher();

	function getComponent() {
		switch (type) {
			case "text":
				return TextContent;
			case "image":
				return ImageContent;
			case "video":
				return VideoContent;
			case "audio":
				return AudioContent;
			case "web":
				return WebContent;
			case "swatch":
				return SwatchContent;
			default:
				return InvalidContent;
		}
	}

	function handleUpdate(e) {
		dispatch("update", { type, data: e.detail });
	}
</script>

<svelte:component this={getComponent()} {data} on:update={handleUpdate} />
