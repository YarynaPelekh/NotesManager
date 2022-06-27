import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// @ts-ignore
import Modal from "../UI/Modal.tsx";
// @ts-ignore
import { directoriesActions } from "../../store/directories-slice.ts";

import classes from "./DirectoriesControls.module.css";

const DirectoriesControls = () => {
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

    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/directories", {
        method: "POST",
        body: JSON.stringify({
          parentId: chosenDirectoryId,
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
      console.log("sending data error");
    });

    setIsModalShown(false);
    console.log("adding new directory");
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
    <div className={classes.controlsContainer}>
      {isModalShown && (
        <Modal onClose={modalOnCloseHandle}>{addDirectoryElements}</Modal>
      )}
      <button onClick={addButtonHandler}>ADD</button>
      <button>REMOVE</button>
    </div>
  );
};

export default DirectoriesControls;
