import { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../UI/Modal";

import { directoriesActions } from "../../../store/directories-slice";

import classes from "./AddButton.module.css";

const AddButton = (props: { onAddSuccess: (isSuccess: boolean) => void }) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) =>
      state.directoriesSlice.chosenDirectoryId
  );

  const addButtonHandler = () => {
    setIsModalShown(true);
  };

  const addDirectoryHandler = () => {
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

      fetchData().catch((error) => {
        console.log("sending data error", error);
      });

      setIsModalShown(false);
      props.onAddSuccess(true);
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
      {isModalShown && (
        <Modal onClose={modalOnCloseHandle}>{addDirectoryElements}</Modal>
      )}
      <button onClick={addButtonHandler}>ADD</button>
    </div>
  );
};
export default AddButton;
