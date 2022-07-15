import React from "react";
import { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../UI/Modal";

import { directoriesActions } from "../../../store/directories-slice";

import classes from "../../../styles/Module/AddButton.module.css";

const AddButton = () => {
  let enteredName = "";

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );

  const addButtonHandler = () => {
    setIsModalShown(true);
  };

  const addDirectoryHandler =  () => {
    enteredName = nameInputRef.current?.value || "";

    if (enteredName.trim().length === 0) {
      alert("Please, enter a valid directory name!");
    } else {
      const data = JSON.stringify({
        parentId: chosenDirectoryId || "1",
        name: enteredName,
      });
      dispatch(directoriesActions.addDirectoryRequest(data));
      setIsModalShown(false);
    }
  };

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const addDirectoryElements = (
    <Fragment>
      <p className={classes.title}>Input a new directory name</p>
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
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{addDirectoryElements}</Modal>}
    </div>
  );
};
export default AddButton;
