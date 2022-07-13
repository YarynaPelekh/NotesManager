import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotesList from "./NotesList";
import NoteDetails from "./NoteDetails";
import NotesControls from "./NotesControls";
import SearchBar from "./Search/SearchBar";

import { notesActions } from "../../store/notes-slice";

import { NoteType } from "../../types/NotesTypes";

import classes from "../../styles/Module/Notes.module.css";

const Notes = () => {
  const dispatch = useDispatch();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );
  let notesList = [
    ...(useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes) as NoteType[]),
  ];

  useEffect(() => {
    dispatch(notesActions.loadNotesRequest());
  }, []);

  notesList = notesList
    .sort((a, b) => {
      return a.position - b.position;
    })
    .filter((item: NoteType) => item.directoryId === chosenDirectoryId);

  return (
    <div className={classes.notes}>
      <p>Notes</p>
      <NotesControls />
      <NotesList notes={notesList} />
      <SearchBar />
    </div>
  );
};

export default Notes;
