import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import { notesActions } from "../../store/notes-slice";

import { appStateActions } from "../../store/app-state-slice";
import { NotificationTypes } from "../../types/NotificationTypes";

import { DnDTypes } from "../../types/DnDTypes";
import { NoteType } from "../../types/NotesTypes";

import classes from "../../styles/Module/ContainerDnD.module.css";

const ContainerDnD = (props: { noteTo: NoteType; children: JSX.Element }) => {
  const dispatch = useDispatch();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );

  const notesList = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes) as NoteType[];

  const updateNotesOnBackend = (notes: NoteType[]) => {
    for (const note of notes) {
      dispatch(notesActions.editNoteRequest(note));
    }
  };

  const moveItem = (itemFrom, monitor) => {
    if (!itemFrom.noteId) {
      return;
    }

    const selectedNotes = notesList.filter((item: NoteType) => item.directoryId === chosenDirectoryId);
    selectedNotes.sort((a, b) => {
      return a.position - b.position;
    });

    const noteFrom = selectedNotes.filter((item: NoteType) => item.id === +itemFrom.noteId)[0];

    const noteTo = Object.assign({}, selectedNotes.splice(selectedNotes.indexOf(noteFrom), 1)[0], {
      position: props.noteTo.position,
    });

    selectedNotes.splice(props.noteTo.position, 0, noteTo);
    for (let i = 0; i < selectedNotes.length; i++) {
      selectedNotes[i] = Object.assign({}, selectedNotes[i], { position: i });
    }

    updateNotesOnBackend(selectedNotes);
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DnDTypes.noteItem,
      drop: (itemFrom, monitor) => moveItem(itemFrom, monitor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [notesList]
  );

  return (
    <div className={classes.containerDnD} ref={drop}>
      {props.children}
    </div>
  );
};

export default React.memo(ContainerDnD);
