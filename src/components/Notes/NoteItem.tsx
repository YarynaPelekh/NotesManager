import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";

import ContainerDnD from "./ContainerDnD";
import Modal from "../UI/Modal";
import ToolTip from "../UI/ToolTip";
import Button from "../UI/Button";
import CustomDisplay from "../UI/CustomDisplay";
import CustomEdit from "../UI/CustomEdit";

import { notesActions } from "../../store/notes-slice";
import { appStateActions } from "../../store/app-state-slice";

import { DnDType } from "../../config/constants";
import { NoteType } from "../../types/NotesTypes";

import classes from "../../styles/Module/NoteItem.module.css";
import classesModal from "../../styles/Module/Modal.module.css";

const NoteItem = (props: { item: NoteType }) => {
  const [noteTitle, setNoteTitle] = useState(props.item.title);
  const [validationMessage, setValidationMessage] = useState("");
  const [isActiveLi, setIsActiveNote] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const APIerror = useSelector((state: { appStateSlice: { APIerror: boolean } }) => state.appStateSlice.APIerror);

  const dispatch = useDispatch();
  const params = useParams();
  const path = useLocation();

  useEffect(() => {
    if (APIerror) {
      setNoteTitle(props.item.title);
    }
    dispatch(appStateActions.assignAPIerror(false));
  }, [APIerror]);

  const chosenNoteId = useSelector((state: { notesSlice: { chosenNoteId: number } }) => state.notesSlice.chosenNoteId);
  const chosenNote = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes).filter(
    (item: NoteType) => item.id === +chosenNoteId
  )[0];

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DnDType.note,
      item: { noteId: props.item.id },
      canDrag: path.pathname.includes("search") ? false : true,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [params.noteId]
  );

  useEffect(() => {
    setIsActiveNote(props.item.id === chosenNoteId);
  }, [chosenNoteId]);

  const saveEdit = (value) => {
    const updatedNote = Object.assign({}, props.item, { title: value });
    dispatch(notesActions.editNoteRequest(updatedNote));
    setNoteTitle(value);
  };

  const inputValidate = (value) => {
    setValidationMessage("Note title shouldn't be empty and more than 20 characters");
    return value.trim().length > 0 && value.trim().length <= 20;
  };

  const onCancel = () => {
    setValidationMessage("");
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
      <form>
        <p className={classesModal.title}>Note Details</p>
        <div className={classesModal.input}>
          <label htmlFor="title">Title:</label>
          <p id="title" className="shadow">
            {props.item.title}
          </p>
        </div>
        <div className={classesModal.input}>
          <label htmlFor="description">Description:</label>
          <p id="description" className="shadow">
            {props.item.description}
          </p>
        </div>
        <div className={classesModal.input}>
          <label htmlFor="tags">Tags:</label>
          <p id="tags" className="shadow">
            {props.item.tags}
          </p>
        </div>
        <div className="controlsContainer">
          <Button onClickButton={modalOnCloseHandle} title="Close" tooltip="" />{" "}
        </div>
      </form>
    </Fragment>
  );

  return (
    <li>
      <ToolTip>
        <div className={classes.notecard} onClick={noteCardClickHandle} data-tip="Choose note">
          <ContainerDnD noteTo={props.item}>
            <div
              ref={drag}
              style={{
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: isDragging ? "#ddd" : "#eee",
              }}
            >
              <div
                className={`${classes.note} ${isActiveLi ? classes.chosen : null}`}
                key={props.item.id}
                onClick={noteIconClickHandle}
                data-tip="View details"
              ></div>
              <div data-tip="In-line edit title">
                <EasyEdit
                  type={Types.TEXT}
                  onSave={saveEdit}
                  onValidate={inputValidate}
                  onCancel={onCancel}
                  saveOnBLur
                  saveButtonLabel="Save"
                  cancelButtonLabel="Cancel"
                  saveButtonStyle="inLineEditButtonStyle"
                  cancelButtonStyle="inLineEditButtonStyle"
                  attributes={{ name: "awesome-input", id: 1 }}
                  value={noteTitle}
                  // validationMessage="Note title shouldn't be empty and more than 20 characters"
                  validationMessage={validationMessage}
                  displayComponent={<CustomDisplay />}
                  editComponent={<CustomEdit />}
                />
              </div>
            </div>
          </ContainerDnD>
        </div>
      </ToolTip>
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{detailsNoteElements}</Modal>}
    </li>
  );
};

export default NoteItem;
