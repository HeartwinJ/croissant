<script>
	import InvalidContent from './CotentTypes/InvalidContent.svelte';
	import TextContent from './CotentTypes/TextContent.svelte';
	import ImageContent from './CotentTypes/ImageContent.svelte';
	import SwatchContent from './CotentTypes/SwatchContent.svelte';

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
