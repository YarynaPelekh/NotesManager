import { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Modal from "../../UI/Modal";

import { appStateActions } from "../../../store/app-state-slice";
import { notesActions } from "../../../store/notes-slice";

import { NotificationTypes } from "../../../types/NotificationTypes";

import { NoteType } from "../../../types/NotesTypes";

import classes from "../../../styles/Module/NotesButton.module.css";

const RemoveButton = () => {
  let notificationText = "";
  let notificationType = NotificationTypes.alertSecondary;

  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const notes = useSelector((state: { notesSlice: { notes: NoteType[] } }) => state.notesSlice.notes);

  const chosenNoteId = useSelector((state: { notesSlice: { chosenNoteId: number } }) => state.notesSlice.chosenNoteId);

  const removeButtonHandler = () => {
    if (chosenNoteId) {
      setIsModalShown(true);
    } else {
      setIsModalShown(false);
      notificationText = "Please, choose a note to remove.";
      dispatch(
        appStateActions.setState({
          showNotification: true,
          notificationType: NotificationTypes.alertWarning,
          notificationMessage: notificationText,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(notesActions.setChosenNoteId(""));
  }, [location.pathname]);

  const removeItem = async (itemId: number) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/notices/" + itemId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Something went wrong/ deleting data from backend!");
      }
      dispatch(notesActions.removeDirectory(itemId));
    };

    await fetchData().catch((error) => {
      throw new Error(error.message);
    });
  };

  const removeDirectoryHandler = async () => {
    let errorText = "";
    try {
      await removeItem(chosenNoteId);
    } catch (error) {
      if (error instanceof Error) {
        errorText = error.message;
      }
    }

    setIsModalShown(false);

    if (errorText) {
      notificationText = errorText;
      notificationType = NotificationTypes.alertDanger;
    } else {
      notificationText = "The note was removed successfully";
      // const path = ".." + location.pathname.slice(0, location.pathname.lastIndexOf("/"));
      // navigate(path, { replace: true });
    }

    dispatch(
      appStateActions.setState({
        showNotification: true,
        notificationType: notificationType,
        notificationMessage: notificationText,
      })
    );
  };

  function modalOnCloseHandle() {
    setIsModalShown(false);
  }

  const removeDirectoryElements = (
    <Fragment>
      <p>Are you sure to remove directory?</p>

      <div className={classes.controlsContainer}>
        <button onClick={removeDirectoryHandler}>OK</button>
        <button onClick={modalOnCloseHandle}>Cancel</button>
      </div>
    </Fragment>
  );

  return (
    <div>
      <button onClick={removeButtonHandler}>REMOVE</button>
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{removeDirectoryElements}</Modal>}
    </div>
  );
};
export default RemoveButton;
