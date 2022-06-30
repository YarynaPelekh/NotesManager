import { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";

import Modal from "../../UI/Modal";
import Notification from "../../UI/Notification";

import { directoriesActions } from "../../../store/directories-slice";

import classes from "./AddButton.module.css";

const portalElement = document.getElementById("overlay") as HTMLElement;
let notificationText = "The directory was added successfully";

const AddButton = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) =>
      state.directoriesSlice.chosenDirectoryId
  );

  const addButtonHandler = () => {
    setIsModalShown(true);
  };

  const addDirectoryHandler = async () => {
    const enteredName = nameInputRef.current?.value || "";

    if (enteredName.trim().length === 0) {
      alert("Please, enter a valid directory name!");
    } else {
      const fetchData = async () => {
        const response = await fetch("http://localhost:3000/directories", {
          method: "POST",
          body: JSON.stringify({
            parentId: chosenDirectoryId || "1",
            name: enteredName,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Something went wrong/ sending data to backend!");
        }
        const responseData = await response.json();
        dispatch(
          directoriesActions.addDirectory({
            id: responseData.id,
            name: responseData.name,
            parentId: responseData.parentId,
          })
        );
      };

      try {
        await fetchData().catch((error) => {
          throw new Error(error.message);
        });
      } catch (error) {
        notificationText = error.toString();
      }

      setIsModalShown(false);
      setShowNotification(true);
    }
  };

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const addDirectoryElements = (
    <Fragment>
      <p>Input a new directory name</p>
      <div className={classes.input}>
        <label htmlFor="name">Name</label>
        <input id="name" ref={nameInputRef}></input>
      </div>
      <div className={classes.controlsContainer}>
        <button onClick={addDirectoryHandler}>OK</button>
        <button onClick={modalOnCloseHandle}>Cancel</button>
      </div>
    </Fragment>
  );

  return (
    <div>
      <button onClick={addButtonHandler}>ADD</button>
      {isModalShown && (
        <Modal onClose={modalOnCloseHandle}>{addDirectoryElements}</Modal>
      )}
      {showNotification &&
        ReactDOM.createPortal(
          <Notification
            notificationText={notificationText}
            onClose={() => {
              setShowNotification(false);
            }}
          />,
          portalElement
        )}
    </div>
  );
};
export default AddButton;
