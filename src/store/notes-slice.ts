import { createSlice } from "@reduxjs/toolkit";

import { NoteType } from "../types/NotesTypes";

const notesSlice = createSlice({
  name: "notesSlice",
  initialState: {
    dataIsLoaded: false,
    notes: [] as NoteType[],
    chosenNoteId: null,
  },
  reducers: {
    loadNotesRequest(state) {},

    addNoteRequest(state, action) {},

    editNoteRequest(state, action) {},

    removeNoteRequest(state, action) {},

    loadNotes(state, action) {
      state.notes = [];
      action.payload.forEach((item: NoteType) => {
        state.notes.push(item);
      });
      state.dataIsLoaded = true;
    },

    addNote(state, action) {
      state.notes.push(action.payload);
    },

    setChosenNoteId(state, action) {
      state.chosenNoteId = action.payload;
    },

    updateNote(state, action) {
      state.notes = state.notes.map((item) => {
        return item.id === action.payload.id ? Object.assign(item, action.payload) : item;
      });
    },

    removeNote(state, action) {
      state.notes = state.notes.filter((item) => item.id !== +action.payload);
      state.chosenNoteId = null;
    },
  },
});

export const notesActions = notesSlice.actions;

export default notesSlice;
