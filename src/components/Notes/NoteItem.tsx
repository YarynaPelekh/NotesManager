import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";
import { useDispatch } from "react-redux";

import { NoteType, PropsNoteItem } from "../../types/NotesTypes";

import ChosenNote from "./ChosenNote.tsx";

import { notesActions } from "../../store/notes-slice";
import { appStateActions } from "../../store/app-state-slice";

import { NotificationTypes } from "../../types/NotificationTypes";

import classes from "../../styles/Module/NoteItem.module.css";

const NoteItem = (props: PropsNoteItem) => {
  let notificationText = "The directory renamed successfully";
  let notificationType = NotificationTypes.alertLight;

  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    if (params.noteId) {
      dispatch(notesActions.setChosenNoteId(params.noteId));
    }
  }, [dispatch, params.noteId]);

  const saveEdit = async (value) => {
    const updatedNote = Object.assign({}, props.item, { title: value });

    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/notices/" + String(props.item.id), {
        method: "PUT",
        body: JSON.stringify(updatedNote),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something went wrong/ sending data to backend!");
      }
      dispatch(notesActions.updateNote(updatedNote));
    };

    try {
      await fetchData().catch((error) => {
        throw new Error(error.message);
      });
    } catch (error) {
      if (error instanceof Error) {
        notificationText = error.message;
        notificationType = NotificationTypes.alertDanger;
      }
    }

    dispatch(
      appStateActions.setState({
        showNotification: true,
        notificationType: notificationType,
        notificationMessage: notificationText,
      })
    );
  };

  return (
    <li className={classes.li}>
      <NavLink
        className={({ isActive }) => `${classes.directory} ${isActive ? classes.chosen : null}`}
        to={`/notes/${props.item.id}`}
        key={props.item.id}
      >
        <EasyEdit
          type={Types.TEXT}
          onSave={saveEdit}
          // onCancel={}
          saveButtonLabel="OK"
          cancelButtonLabel="Cancel"
          attributes={{ name: "awesome-input", id: 1 }}
          value={props.item.title}
        />
      </NavLink>
    </li>
  );
};

export default NoteItem;
