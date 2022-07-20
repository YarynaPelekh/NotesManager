import React, { Fragment, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";

import { appStateActions } from "../../../store/app-state-slice";
import { directoriesActions } from "../../../store/directories-slice";

import { NotificationTypes } from "../../../types/NotificationTypes";
import { DirectoryType } from "../../../types/DirectoryTypes";

import classesModal from "../../../styles/Module/Modal.module.css";

const RemoveButton = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const notificationText = "Please, choose a directory to remove.";
      dispatch(
        appStateActions.setState({
          showNotification: true,
          notificationType: NotificationTypes.alertWarning,
          notificationMessage: notificationText,
        })
      );
    }
  };

  const removeItem = (itemId: string) => {
    dispatch(directoriesActions.removeDirectoryRequest(itemId));
  };

  const recursiveRemove = (currentId: string) => {
    const arrChildren = directories.filter((item) => item.parentId === currentId) as DirectoryType[];

    arrChildren.length > 0 &&
      arrChildren.forEach((item) => {
        recursiveRemove(String(item.id));
      });

    removeItem(currentId);
  };

  const removeDirectoryHandler = () => {
    recursiveRemove(chosenDirectoryId);

    const path = "/";
    navigate(path, { replace: true });
    setIsModalShown(false);
  };

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const removeDirectoryElements = (
    <Fragment>
      <p className={classesModal.title}>Are you sure to remove directory?</p>

      <div className="controlsContainer">
        <Button onClickButton={removeDirectoryHandler} title="OK" tooltip="" />
        <Button onClickButton={modalOnCloseHandle} title="Cancel" tooltip="" />
      </div>
    </Fragment>
  );

  return (
    <div>
      <Button title="REMOVE" onClickButton={removeButtonHandler} tooltip="Remove directory" />
      {isModalShown && <Modal onClose={modalOnCloseHandle}>{removeDirectoryElements}</Modal>}
    </div>
  );
};
export default RemoveButton;
