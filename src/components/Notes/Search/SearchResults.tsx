import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import NotesList from "../NotesList";

import { NoteType } from "../../types/NotesTypes";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let notesList = [
    ...(useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes) as NoteType[]),
  ];
  notesList = notesList
    .sort((a, b) => {
      return a.position - b.position;
    })
    .filter((item: NoteType) => item.title.includes(location.state.searchValue));
  return (
    <div>
      <p>Search results</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <NotesList notes={notesList} />
    </div>
  );
};

export default SearchResults;
