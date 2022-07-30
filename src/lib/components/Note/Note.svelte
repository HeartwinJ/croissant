<script>
	import NoteContainer from "$lib/components/Note/NoteContainer.svelte";
	import NoteContent from "$lib/components/Note/NoteContent.svelte";
	import NoteTitle from "$lib/components/Note/NoteTitle.svelte";

	import { notes, contextMenu } from "$lib/stores";

	export let _id;
	export let config;
	export let content;

	let { title, ...rest } = content;

	let menuConfig = {
		isVisible: false,
		pos: { x: 0, y: 0 },
		options: [
			{
				text: "Copy Source",
				onClick: handleCopySource
			}
		]
	};

	function handleContextMenu(e) {
		menuConfig.pos = e.detail;
		contextMenu.show(menuConfig);
	}

	function handleCopySource() {
		navigator.clipboard.writeText(content.data.src || content.data || '');
		contextMenu.hide();
	}

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

<NoteContainer
	{...config}
	on:contextmenu={handleContextMenu}
	on:update={handleUpdateConfig}
	on:delete={handleDeleteNote}
>
	<NoteTitle slot="title" {title} on:update={handleUpdateTitle} />
	<NoteContent {...rest} on:update={handleUpdateContent} />
</NoteContainer>
