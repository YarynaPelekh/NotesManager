import React from "react";
import { useSelector } from "react-redux";

import NotesList from "./NotesList";
import NotesControls from "./NotesControls";
import SearchBar from "./Search/SearchBar";
import SectionHeader from "../UI/Layout/SectionHeader";

import { NoteType } from "../../types/NotesTypes";

const Notes = () => {
  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );
  let notesList = [
    ...(useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes) as NoteType[]),
  ];

  notesList = notesList
    .sort((a, b) => {
      return a.position - b.position;
    })
    .filter((item: NoteType) => item.directoryId === chosenDirectoryId);

  return (
    <div className="section shadow">
      <SectionHeader header="Notes" />
      <NotesControls />
      <SearchBar />
      <NotesList notes={notesList} />
    </div>
  );
};

export default Notes;
