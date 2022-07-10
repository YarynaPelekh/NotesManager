import { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../UI/Modal";
import AddEditForm from "./AddEditForm";

import { appStateActions } from "../../../store/app-state-slice";
import { notesActions } from "../../../store/notes-slice";
import { tagsActions } from "../../../store/tags-slice";

import { NotificationTypes } from "../../../types/NotificationTypes";
import { NoteType, InputNoteValues } from "../../../types/NotesTypes";

const EditButton = () => {
  let notificationText = "The note was edited successfully";
  let notificationType = NotificationTypes.alertLight;

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

  const editNoteHandler = async (enteredValues: InputNoteValues) => {
    const enteredTitle = enteredValues.title;
    const enteredDescription = enteredValues.description;
    const enteredTags = enteredValues.tags;

    const updatedNote = Object.assign({}, chosenNote, {
      description: enteredDescription,
      tags: enteredTags,
      title: enteredTitle,
    });

    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/notices/" + String(chosenNoteId), {
        method: "PUT",
        body: JSON.stringify(updatedNote),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Something went wrong/ sending data to backend!");
      } else {
        const responseData = await response.json();
        dispatch(notesActions.updateNote(responseData));

        dispatch(tagsActions.updateTags(responseData.tags));
      }
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
      <button onClick={editButtonHandler}>EDIT</button>
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{editNoteElements}</Modal>}
    </div>
  );
};

export default EditButton;
