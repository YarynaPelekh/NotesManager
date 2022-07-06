import { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../UI/Modal";

import { appStateActions } from "../../../store/app-state-slice";
import { notesActions } from "../../../store/notes-slice";

import { NotificationTypes } from "../../../types/NotificationTypes";

import classes from "../../../styles/Module/NotesButton.module.css";

const AddButton = () => {
  let notificationText = "The note was added successfully";
  let notificationType = NotificationTypes.alertLight;
  let enteredTitle = "";
  let enteredDescription = "";
  let enteredTags = "";

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const tagsInputRef = useRef<HTMLInputElement>(null);
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

  const addNoteHandler = async () => {
    enteredTitle = titleInputRef.current?.value || "";
    enteredDescription = descriptionInputRef.current?.value || "";
    enteredTags = tagsInputRef.current?.value || "";
    if (enteredTitle.trim().length === 0) {
      alert("Please, enter a valid note title!");
    } else {
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
    }
  };

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const addNoteElements = (
    <Fragment>
      <p>Input a new note</p>
      <div className={classes.input}>
        <label htmlFor="title">Title</label>
        <input id="title" ref={titleInputRef}></input>
      </div>
      <div className={classes.input}>
        <label htmlFor="description">Description</label>
        <textarea id="description" ref={descriptionInputRef}></textarea>
      </div>
      <div className={classes.input}>
        <label htmlFor="tags">Tags</label>
        <input id="tags" ref={tagsInputRef}></input>
      </div>
      <div className={classes.controlsContainer}>
        <button onClick={addNoteHandler}>OK</button>
        <button onClick={modalOnCloseHandle}>Cancel</button>
      </div>
    </Fragment>
  );

  return (
    <div>
      <button onClick={addButtonHandler}>ADD</button>
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{addNoteElements}</Modal>}
    </div>
  );
};
export default AddButton;
