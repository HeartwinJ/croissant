<script>
	import NoteContainer from './NoteContainer.svelte';

	export let noteData;
</script>

<NoteContainer {...noteData}>
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
</NoteContainer>
