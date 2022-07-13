import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";

import ContainerDnD from "./ContainerDnD";
import Modal from "../UI/Modal";

import { notesActions } from "../../store/notes-slice";
import { appStateActions } from "../../store/app-state-slice";

import { NotificationTypes } from "../../types/NotificationTypes";
import { DnDTypes } from "../../types/DnDTypes";

import classes from "../../styles/Module/NoteItem.module.css";
import { NoteType } from "../../types/NotesTypes";

const NoteItem = (props: { item: NoteType }) => {
  let notificationText = "The note was renamed successfully";
  let notificationType = NotificationTypes.alertLight;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const dispatch = useDispatch();
  const params = useParams();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DnDTypes.noteItem,
      item: { noteId: props.item.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [params.noteId]
  );

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

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const noteClickHandle = () => {
    setIsModalShown(true);
  };

  const detailsNoteElements = (
    <Fragment>
      <p className={classes.title}>Note Details</p>
      <div className={classes.input}>
        <label htmlFor="title">Title:</label>
        <p id="title">{props.item.title}</p>
      </div>
      <div className={classes.input}>
        <label htmlFor="description">Description:</label>
        <p id="description">{props.item.description}</p>
      </div>
      <div className={classes.input}>
        <label htmlFor="tags">Tags:</label>
        <p id="tags">{props.item.tags}</p>
      </div>
      <div className={classes.controlsContainer}>
        <button onClick={modalOnCloseHandle}>Close</button>
      </div>
    </Fragment>
  );

  return (
    <li className={classes.li}>
      <ContainerDnD noteTo={props.item}>
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            backgroundColor: isDragging ? "#ddd" : "#fff",
          }}
        >
          <NavLink
            className={({ isActive }) => `${classes.note} ${isActive ? classes.chosen : null}`}
            to={`/notes/${props.item.id}`}
            key={props.item.id}
            onDoubleClick={noteClickHandle}
          ></NavLink>
          <div className={classes.easyEditClass}>
            <EasyEdit
              type={Types.TEXT}
              onSave={saveEdit}
              saveButtonLabel="Save"
              cancelButtonLabel="Cancel"
              attributes={{ name: "awesome-input", id: 1 }}
              value={props.item.title}
              saveButtonStyle={classes.saveButtonStyle}
              cancelButtonStyle={classes.saveButtonStyle}
            />
          </div>
        </div>
      </ContainerDnD>
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{detailsNoteElements}</Modal>}
    </li>
  );
};

export default NoteItem;
