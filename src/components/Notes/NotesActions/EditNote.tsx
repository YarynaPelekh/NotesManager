import React, { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import AddEditForm from "./AddEditForm";

import { appStateActions } from "../../../store/app-state-slice";
import { notesActions } from "../../../store/notes-slice";
import { tagsActions } from "../../../store/tags-slice";

import { NotificationTypes } from "../../../types/NotificationTypes";
import { NoteType, InputNoteValues } from "../../../types/NotesTypes";

const EditNote = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const dispatch = useDispatch();

  const chosenNoteId = useSelector((state: { notesSlice: { chosenNoteId: number } }) => state.notesSlice.chosenNoteId);
  const chosenNote = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes).filter(
    (item: NoteType) => item.id === +chosenNoteId
  )[0];

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const editButtonHandler = () => {
    if (!chosenNoteId) {
      dispatch(
        appStateActions.setState({
          showNotification: true,
          notificationType: NotificationTypes.alertWarning,
          notificationMessage: "Please, choose a note!",
        })
      );
    } else {
      setIsModalShown(true);
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

  const editNoteElements = (
    <AddEditForm
      formTitle="Edit note details"
      initialValues={{
        title: chosenNote && chosenNote.title,
        description: chosenNote && chosenNote.description,
        tags: chosenNote && chosenNote.tags,
      }}
      saveNoteHandler={editNoteHandler}
      modalOnCloseHandle={modalOnCloseHandle}
    />
  );

  return (
    <div>
      <Button title="EDIT" onClickButton={editButtonHandler} tooltip="Edit note" />
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{editNoteElements}</Modal>}
    </div>
  );
};

export default EditNote;
