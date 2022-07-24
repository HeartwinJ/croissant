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

export const notes = createNotes();
