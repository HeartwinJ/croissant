import { writable } from "svelte/store";

function createNotes() {
	const { subscribe, set } = writable([]);

	const updateNote = async (note) => {
		const res = await fetch("/notes", {
			method: "PUT",
			body: JSON.stringify(note)
		});
		const json = await res.json();
		set(json.notes);
	};

	const addNote = async (note) => {
		const res = await fetch("/notes", {
			method: "POST",
			body: JSON.stringify(note)
		});
		const json = await res.json();
		set(json.notes);
	};

	const deleteNote = async (note) => {
		const res = await fetch("/notes", {
			method: "DELETE",
			body: JSON.stringify(note)
		});
		const json = await res.json();
		set(json.notes);
	};

	return {
		subscribe,
		set,
		updateNote,
		addNote,
		deleteNote
	};
}

function createContextMenu() {
	const { subscribe, update } = writable({
		isVisible: false,
		pos: { x: 0, y: 0 },
		options: []
	});

	const show = (config) => {
		update((ctxMenu) => {
			config = config || ctxMenu;
			config.isVisible = true;
			return config;
		});
	};

	const hide = (config) => {
		update((ctxMenu) => {
			config = config || ctxMenu;
			config.isVisible = false;
			return config;
		});
	};

	return {
		subscribe,
		show,
		hide
	};
}

export const notes = createNotes();
export const contextMenu = createContextMenu();
