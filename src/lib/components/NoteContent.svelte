<script>
	import InvalidContent from '$lib/components/ContentTypes/InvalidContent.svelte';
	import TextContent from '$lib/components/ContentTypes/TextContent.svelte';
	import ImageContent from '$lib/components/ContentTypes/ImageContent.svelte';
	import SwatchContent from '$lib/components/ContentTypes/SwatchContent.svelte';

	export let data;
	export let type;

	function getComponent() {
		switch (type) {
			case 'text':
				return TextContent;
			case 'image':
				return ImageContent;
			case 'swatch':
				return SwatchContent;
			default:
				return InvalidContent;
		}
	}
</script>

<svelte:component this={getComponent()} {data} />
