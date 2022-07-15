import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { useLocation } from "react-router-dom";

import EasyEdit, { Types } from "react-easy-edit";
import { useDispatch, useSelector } from "react-redux";
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
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const path = useLocation();

  const dispatch = useDispatch();
  const params = useParams();

  const chosenNoteId = useSelector((state: { notesSlice: { chosenNoteId: number } }) => state.notesSlice.chosenNoteId);
  const chosenNote = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes).filter(
    (item: NoteType) => item.id === +chosenNoteId
  )[0];

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DnDTypes.noteItem,
      item: { noteId: props.item.id },
      canDrag: path.pathname.includes("search") ? false : true,
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

  const onValidateHandle = (value) => {
    // const updatedNote = Object.assign({}, props.item, { title: value });
    // dispatch(notesActions.editNoteRequest(updatedNote));
    // return value === chosenNote.title;
    return true;
  };

  const saveEdit = (value) => {
    const updatedNote = Object.assign({}, props.item, { title: value });
    dispatch(notesActions.editNoteRequest(updatedNote));
    // console.log("saveEdit", chosenNote.title);
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

  console.log("render ", props.item.title);

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
            to={path.pathname.includes("search") ? path.pathname + path.search : `/notes/${props.item.id}`}
            key={props.item.id}
            onClick={noteClickHandle}
          ></NavLink>
          <EasyEdit
            type={Types.TEXT}
            onSave={saveEdit}
            onValidate={onValidateHandle}
            saveButtonLabel="Save"
            cancelButtonLabel="Cancel"
            attributes={{ name: "awesome-input", id: 1 }}
            value={props.item.title}
            saveButtonStyle={classes.saveButtonStyle}
            cancelButtonStyle={classes.saveButtonStyle}
          />
        </div>
      </ContainerDnD>
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{detailsNoteElements}</Modal>}
    </li>
  );
};

export default NoteItem;
