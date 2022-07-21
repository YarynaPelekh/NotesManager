import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import AddEditForm from "./AddEditForm";

import { appStateActions } from "../../../store/app-state-slice";
import { notesActions } from "../../../store/notes-slice";

import { NotificationTypes } from "../../../types/NotificationTypes";
import { InputNoteValues } from "../../../types/NotesTypes";

const AddNote = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const dispatch = useDispatch();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );

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

  const addNoteElements = (
    <AddEditForm
      formTitle="Input a new note"
      initialValues={{ title: "", description: "", tags: "" }}
      saveNoteHandler={addNoteHandler}
      modalOnCloseHandle={modalOnCloseHandle}
    />
  );

  return (
    <div>
      <Button title="ADD" onClickButton={addButtonHandler} tooltip="Add note" />
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{addNoteElements}</Modal>}
    </div>
  );
};
export default AddNote;
