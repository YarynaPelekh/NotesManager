import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";

import ContainerDnD from "./ContainerDnD";
import Modal from "../UI/Modal";

import { notesActions } from "../../store/notes-slice";

import { DnDTypes } from "../../types/DnDTypes";
import { NoteType } from "../../types/NotesTypes";

import classes from "../../styles/Module/NoteItem.module.css";

const NoteItem = (props: { item: NoteType }) => {
  const [isActiveLi, setIsActiveLi] = useState<boolean>(false);
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
    setIsActiveLi(props.item.id === chosenNoteId);
  }, [chosenNoteId]);

  const onValidateHandle = (value) => {
    // const updatedNote = Object.assign({}, props.item, { title: value });
    // dispatch(notesActions.editNoteRequest(updatedNote));
    // return value === chosenNote.title;
    return true;
  };

  const saveEdit = (value) => {
    const updatedNote = Object.assign({}, props.item, { title: value });
    dispatch(notesActions.editNoteRequest(updatedNote));
  };

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const noteIconClickHandle = () => {
    setIsModalShown(true);
  };

  const noteCardClickHandle = () => {
    dispatch(notesActions.setChosenNoteId(props.item.id));
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
    <li>
      <div className={classes.notecard} onClick={noteCardClickHandle}>
        <ContainerDnD noteTo={props.item}>
          <div
            ref={drag}
            style={{
              opacity: isDragging ? 0.5 : 1,
              backgroundColor: isDragging ? "#ddd" : "#fff",
            }}
          >
            <div
              className={`${classes.note} ${isActiveLi ? classes.chosen : null}`}
              key={props.item.id}
              onClick={noteIconClickHandle}
            ></div>
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
      </div>
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{detailsNoteElements}</Modal>}
    </li>
  );
};

export default NoteItem;
