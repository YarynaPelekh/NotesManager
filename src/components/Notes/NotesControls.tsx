import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { appStateActions } from "../../store/app-state-slice";
import { notesActions } from "../../store/notes-slice";

import NoteForm from "./NoteForm";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

import { NotificationTypes } from "../../types/NotificationTypes";
import { NoteType, InputNoteValues } from "../../types/NotesTypes";

import classesModal from "../../styles/Module/Modal.module.css";

const NotesControls = () => {
  let notificationText = "";
  let notificationType = NotificationTypes.alertSecondary;

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [noteAction, setNoteAction] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );
  const chosenNoteId = useSelector((state: { notesSlice: { chosenNoteId: number } }) => state.notesSlice.chosenNoteId);
  const chosenNote = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes).filter(
    (item: NoteType) => item.id === +chosenNoteId
  )[0];

  const addButtonHandler = () => {
    if (!chosenDirectoryId) {
      dispatch(
        appStateActions.setNotification({
          showNotification: true,
          notificationType: NotificationTypes.alertWarning,
          notificationMessage: "Please, choose a directory!",
        })
      );
    } else {
      setNoteAction("ADD");
      setIsModalShown(true);
    }
  };

  const addNoteHandler = (enteredValues: InputNoteValues) => {
    const enteredTitle = enteredValues.title;
    const enteredDescription = enteredValues.description;
    const enteredTags = enteredValues.tags;

    dispatch(
      notesActions.addNoteRequest({
        description: enteredDescription,
        directoryId: chosenDirectoryId,
        tags: enteredTags,
        title: enteredTitle,
      })
    );

    setIsModalShown(false);
  };

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const editButtonHandler = () => {
    if (!chosenNoteId) {
      dispatch(
        appStateActions.setNotification({
          showNotification: true,
          notificationType: NotificationTypes.alertWarning,
          notificationMessage: "Please, choose a note!",
        })
      );
    } else {
      setIsModalShown(true);
      setNoteAction("EDIT");
    }
  };

  const editNoteHandler = (enteredValues: InputNoteValues) => {
    const enteredTitle = enteredValues.title;
    const enteredDescription = enteredValues.description;
    const enteredTags = enteredValues.tags;

    const updatedNote = Object.assign({}, chosenNote, {
      description: enteredDescription,
      tags: enteredTags,
      title: enteredTitle,
    });
    dispatch(notesActions.editNoteRequest(updatedNote));

    setIsModalShown(false);
  };

  const removeButtonHandler = () => {
    if (chosenNoteId) {
      setIsModalShown(true);
      setNoteAction("REMOVE");
    } else {
      setIsModalShown(false);
      notificationText = "Please, choose a note to remove.";
      dispatch(
        appStateActions.setNotification({
          showNotification: true,
          notificationType: NotificationTypes.alertWarning,
          notificationMessage: notificationText,
        })
      );
    }
  };

  const removeNoteHandler = () => {
    dispatch(notesActions.removeNoteRequest(chosenNoteId));
    navigate("/", { replace: true });
    setIsModalShown(false);
  };

  let noteInitialValues = { title: "", description: "", tags: "" };
  let noteActionHandler = addNoteHandler;

  if (noteAction == "EDIT") {
    noteInitialValues = {
      title: chosenNote && chosenNote.title,
      description: chosenNote && chosenNote.description,
      tags: chosenNote && chosenNote.tags,
    };
    noteActionHandler = editNoteHandler;
  }

  let noteElements = (
    <NoteForm
      formTitle="Edit note details"
      initialValues={noteInitialValues}
      saveNoteHandler={noteActionHandler}
      modalOnCloseHandle={modalOnCloseHandle}
    />
  );

  if (noteAction == "REMOVE") {
    noteElements = (
      <form>
        <p className={classesModal.title}>Are you sure to remove note?</p>
        <div className="controlsContainer">
          <Button onClickButton={removeNoteHandler} title="OK" tooltip="" />
          <Button onClickButton={modalOnCloseHandle} title="Cancel" tooltip="" />
        </div>
      </form>
    );
  }

  return (
    <div className="controlsContainer shadow">
      <Button title="ADD" onClickButton={addButtonHandler} tooltip="Add note" />
      <Button title="EDIT" onClickButton={editButtonHandler} tooltip="Edit note" />
      <Button title="REMOVE" onClickButton={removeButtonHandler} tooltip="Remove note" />
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{noteElements}</Modal>}
    </div>
  );
};

export default NotesControls;
