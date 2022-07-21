<script>
	import NoteContainer from './NoteContainer.svelte';
	import NoteContent from './NoteContent.svelte';
	import NoteTitle from './NoteTitle.svelte';

	export let config;
	export let content;

	let { title, ...rest } = content;
</script>

<NoteContainer {...config}>
	<NoteTitle slot="title" {title} />
	<NoteContent {...rest} />
</NoteContainer>
