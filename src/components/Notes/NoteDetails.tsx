import { Fragment } from "react";
import { useSelector } from "react-redux";

import { NoteType } from "../../types/NotesTypes";

import classes from "../../styles/Module/NoteDetails.module.css";

const NoteDetails = () => {
  const chosenNoteId = useSelector((state: { notesSlice: { chosenNoteId: number } }) => state.notesSlice.chosenNoteId);
  const chosenNote = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes).filter(
    (item: NoteType) => item.id === +chosenNoteId
  )[0];

  return (
    <Fragment>
      <p className={classes.title}>Note details</p>
      {chosenNote && (
        <Fragment>
          <div className={classes.input}>
            <label htmlFor="title">Title:</label>
            <p id="title">{chosenNote.title}</p>
          </div>
          <div className={classes.input}>
            <label htmlFor="description">Description:</label>
            <p id="description">{chosenNote.description}</p>
          </div>
          <div className={classes.input}>
            <label htmlFor="tags">Tags:</label>
            <p id="tags">{chosenNote.tags}</p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default NoteDetails;
