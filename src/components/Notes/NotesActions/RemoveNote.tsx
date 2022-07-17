import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";

import { appStateActions } from "../../../store/app-state-slice";
import { notesActions } from "../../../store/notes-slice";

import { NotificationTypes } from "../../../types/NotificationTypes";

import { NoteType } from "../../../types/NotesTypes";

import classesModal from "../../../styles/Module/Modal.module.css";

const RemoveNote = () => {
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

  const removeNoteHandler = () => {
    dispatch(notesActions.removeNoteRequest(chosenNoteId));
    navigate("/", { replace: true });
    setIsModalShown(false);
  };

  function modalOnCloseHandle() {
    setIsModalShown(false);
  }

  const removeNoteElements = (
    <Fragment>
      <p className={classesModal.title}>Are you sure to remove note?</p>

      <div className={classesModal.controlsContainer}>
        <button onClick={removeNoteHandler}>OK</button>
        <button onClick={modalOnCloseHandle}>Cancel</button>
      </div>
    </Fragment>
  );

  return (
    <div>
      <Button title="REMOVE" onClickButton={removeButtonHandler} tooltip="Remove note" />
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{removeNoteElements}</Modal>}
    </div>
  );
};
export default RemoveNote;
