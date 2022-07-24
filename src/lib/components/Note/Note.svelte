<script>
	import NoteContainer from "$lib/components/Note/NoteContainer.svelte";
	import NoteContent from "$lib/components/Note/NoteContent.svelte";
	import NoteTitle from "$lib/components/Note/NoteTitle.svelte";

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
		content = { title, ...e.detail };
		handleUpdate();
	}

	function handleDeleteNote() {
		notes.deleteNote({ _id, config, content });
	}
</script>

<NoteContainer {...config} on:update={handleUpdateConfig} on:delete={handleDeleteNote}>
	<NoteTitle slot="title" {title} on:update={handleUpdateTitle} />
	<NoteContent {...rest} on:update={handleUpdateContent} />
</NoteContainer>
