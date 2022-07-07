import { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../UI/Modal";
import AddEditForm from "./AddEditForm";

import { appStateActions } from "../../../store/app-state-slice";
import { notesActions } from "../../../store/notes-slice";

import { NotificationTypes } from "../../../types/NotificationTypes";
import { InputNoteValues } from "../../../types/NotesTypes";
import { tagsActions } from "../../../store/tags-slice";

const AddButton = () => {
  let notificationText = "The note was added successfully";
  let notificationType = NotificationTypes.alertLight;

  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const dispatch = useDispatch();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );

  const addButtonHandler = () => {
    if (!chosenDirectoryId) {
      dispatch(
        appStateActions.setState({
          showNotification: true,
          notificationType: NotificationTypes.alertWarning,
          notificationMessage: "Please, choose a directory!",
        })
      );
    } else {
      setIsModalShown(true);
    }
  };

  const addNoteHandler = async (enteredValues: InputNoteValues) => {
    const enteredTitle = enteredValues.title;
    const enteredDescription = enteredValues.description;
    const enteredTags = enteredValues.tags;

    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/notices", {
        method: "POST",
        body: JSON.stringify({
          description: enteredDescription,
          directoryId: chosenDirectoryId,
          tags: enteredTags,
          title: enteredTitle,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Something went wrong/ sending data to backend!");
      } else {
        const responseData = await response.json();
        dispatch(
          notesActions.addNote({
            description: responseData.description,
            directoryId: responseData.directoryId,
            id: responseData.id,
            position: responseData.position,
            tags: responseData.tags,
            title: responseData.title,
          })
        );
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

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const addNoteElements = (
    <AddEditForm
      initialValues={{ title: "", description: "", tags: "" }}
      saveNoteHandler={addNoteHandler}
      modalOnCloseHandle={modalOnCloseHandle}
    />
  );

  return (
    <div>
      <button onClick={addButtonHandler}>ADD</button>
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{addNoteElements}</Modal>}
    </div>
  );
};
export default AddButton;
