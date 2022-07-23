<script>
	import NoteContainer from "$lib/components/NoteContainer.svelte";
	import NoteContent from "$lib/components/NoteContent.svelte";
	import NoteTitle from "$lib/components/NoteTitle.svelte";

	import { notes } from "$lib/stores";

	export let _id;
	export let config;
	export let content;

	let { title, ...rest } = content;

	function handleUpdate() {
		notes.updateNote({ _id, config, content });
	}

	function handleUpdateConfig(e) {
		config = e.detail;
		handleUpdate();
	}

	function handleUpdateTitle(e) {
		console.log("upateTitle", e.detail);
	}

	function handleUpdateContent(e) {
		console.log("updateContent", e.detail);
	}
</script>

<NoteContainer {...config} on:update={handleUpdateConfig}>
	<NoteTitle slot="title" {title} on:update={handleUpdateTitle} />
	<NoteContent {...rest} on:update={handleUpdateContent} />
</NoteContainer>
