import { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Modal from "../../UI/Modal";

import { appStateActions } from "../../../store/app-state-slice";
import { directoriesActions } from "../../../store/directories-slice";

import { NotificationTypes } from "../../../types/NotificationTypes";

// @ts-ignore
import { DirectoryType } from "../../types/DirectoryTypes";

import classes from "../../../styles/Module/AddButton.module.css";

const RemoveButton = () => {
  let notificationText = "";
  let notificationType = NotificationTypes.alertSecondary;

  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const directories = useSelector(
    (state: { directoriesSlice: { directories: DirectoryType[] } }) => state.directoriesSlice.directories
  );

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );

  const removeButtonHandler = () => {
    if (chosenDirectoryId) {
      setIsModalShown(true);
    } else {
      setIsModalShown(false);
      notificationText = "Please, choose a directory to remove.";
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
    dispatch(directoriesActions.setChosenDirectoryId(""));
  }, [location.pathname]);

  const removeItem = async (itemId: string) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/directories/" + itemId.trim(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

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
    const arrChildren = directories.filter((item) => item.parentId === currentId) as DirectoryType[];

    arrChildren.length > 0 &&
      arrChildren.forEach((item) => {
        recursiveRemove(String(item.id));
      });

    await removeItem(currentId);
  };

  const removeDirectoryHandler = async () => {
    let errorText = "";
    try {
      await recursiveRemove(chosenDirectoryId);
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
      notificationText = "The directory was removed successfully";
      // const path = ".." + location.pathname.slice(0, location.pathname.lastIndexOf("/"));
      const path = "/";
      navigate(path, { replace: true });
    }

    dispatch(
      appStateActions.setState({
        showNotification: true,
        notificationType: notificationType,
        notificationMessage: notificationText,
      })
    );
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
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{removeDirectoryElements}</Modal>}
    </div>
  );
};
export default RemoveButton;
