import { Fragment, useState } from "react";
import ReactDOM from "react-dom";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Modal from "../../UI/Modal";
import Notification from "../../UI/Notification";

import { directoriesActions } from "../../../store/directories-slice";
import { DirectoryType } from "../../types/DirectoryTypes";

import classes from "./AddButton.module.css";

const portalElement = document.getElementById("overlay") as HTMLElement;

let notificationText = "";

const RemoveButton = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) =>
      state.directoriesSlice.chosenDirectoryId
  );

  const removeButtonHandler = () => {
    if (chosenDirectoryId) {
      setIsModalShown(true);
    } else {
      setIsModalShown(false);
      notificationText = "Please, choose a directory to remove.";
      setShowNotification(true);
    }
  };

  const directories = useSelector(
    (state: { directoriesSlice: { directories: DirectoryType[] } }) =>
      state.directoriesSlice.directories
  );

  const removeItem = async (itemId: string) => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3000/directories/" + itemId.trim(),
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong/ deleting data from backend!");
      }
      dispatch(directoriesActions.removeDirectory(+itemId));
    };

    await fetchData().catch((error) => {
      throw new Error(error.message);
    });
  };

  const recursiveRemove = async (currentId: string) => {
    const arrChildren = directories.filter(
      (item) => item.parentId === currentId
    ) as DirectoryType[];

    arrChildren.length > 0 &&
      arrChildren.forEach((item) => {
        recursiveRemove(String(item.id));
      });

    await removeItem(currentId);
  };

  const removeDirectoryHandler = async () => {
    let isError = false;
    let errorText = "";
    try {
      await recursiveRemove(chosenDirectoryId);
    } catch (error) {
      isError = true;
      errorText = error.message;
    }

    setIsModalShown(false);

    if (isError) {
      notificationText = errorText;
    } else {
      dispatch(directoriesActions.setChosenDirectoryId(""));
      notificationText = "The directory was removed successfully";
      const path =
        ".." + location.pathname.slice(0, location.pathname.lastIndexOf("/"));
      navigate(path, { replace: true });
    }

    setShowNotification(true);
  };

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

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
      {isModalShown && (
        <Modal onClose={modalOnCloseHandle}>{removeDirectoryElements}</Modal>
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
export default RemoveButton;
