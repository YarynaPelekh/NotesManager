import React from "react";
import { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import ToolTip from "../../UI/ToolTip";

import { directoriesActions } from "../../../store/directories-slice";

import classesModal from "../../../styles/Module/Modal.module.css";

const AddDirectory = () => {
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

  const addDirectoryHandler = () => {
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
    <ToolTip>
      <Fragment>
        <p className={classesModal.title}>Input a new directory name</p>
        <div className={classesModal.input}>
          <label htmlFor="name">Name</label>
          <input id="name" ref={nameInputRef} data-tip="Enter directory name"></input>
        </div>
        <div className={classesModal.controlsContainer}>
          <button onClick={addDirectoryHandler}>OK</button>
          <button onClick={modalOnCloseHandle}>Cancel</button>
        </div>
      </Fragment>
    </ToolTip>
  );

  return (
    <div>
      <Button title="ADD" onClickButton={addButtonHandler} tooltip="Add directory" />
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{addDirectoryElements}</Modal>}
    </div>
  );
};
export default AddDirectory;
//
