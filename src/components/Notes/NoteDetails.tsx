import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

import PageHeader from "../UI/Layout/PageHeader.tsx";

import { notesActions } from "../../store/notes-slice";
import { NoteType } from "../../types/NotesTypes";

import classes from "../../styles/Module/NoteDetails.module.css";

const NoteDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const chosenNoteId = useSelector((state: { notesSlice: { chosenNoteId: number } }) => state.notesSlice.chosenNoteId);
  const chosenNote = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes).filter(
    (item: NoteType) => item.id === +chosenNoteId
  )[0];

  useEffect(() => {
    if (params.noteId) {
      dispatch(notesActions.setChosenNoteId(params.noteId));
    }
  }, [dispatch, params.noteId]);

  return (
    <Fragment>
      <PageHeader header="Note details" />
      {chosenNote && (
        <div className={classes.container}>
          <div className={classes.output}>
            <label htmlFor="title">Title:</label>
            <p id="title">{chosenNote.title}</p>
          </div>
          <div className={classes.output}>
            <label htmlFor="description">Description:</label>
            <p id="description">{chosenNote.description}</p>
          </div>
          <div className={classes.output}>
            <label htmlFor="tags">Tags:</label>
            <p id="tags">{chosenNote.tags}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default NoteDetails;
