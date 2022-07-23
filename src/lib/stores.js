import { writable } from "svelte/store";

function createNotes() {
	const { subscribe, set, update } = writable([]);

	const updateNote = async (note) => {
		const res = await fetch("/notes", {
			method: "PUT",
			body: JSON.stringify(note)
		});
		const json = await res.json();
		set(json.notes);
	};

	const addNote = (note) => {
		update((_notes) => {
			_notes.push(note);
			return _notes;
		});
	};

	const removeNote = (note) => {
		update((_notes) => {
			set(_notes.filter((_note) => _note._id !== note._id));
		});
	};

	return {
		subscribe,
		set,
		updateNote,
		addNote,
		removeNote
	};
}

export const notes = createNotes();
