import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import DirectoryForm from "./DirectoryForm";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import ToolTip from "../UI/ToolTip";

import { appStateActions } from "../../store/app-state-slice";
import { directoriesActions } from "../../store/directories-slice";

import { NotificationTypes } from "../../types/NotificationTypes";
import { DirectoryType } from "../../types/DirectoryTypes";

import classesModal from "../../styles/Module/Modal.module.css";

const DirectoriesControls = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [isAddDirectory, setIsAddDirectory] = useState<boolean>(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );

  const directories = useSelector(
    (state: { directoriesSlice: { directories: DirectoryType[] } }) => state.directoriesSlice.directories
  );

  const addButtonHandler = () => {
    setIsAddDirectory(true);
    setIsModalShown(true);
  };

  const onSubmitAddDirectory = (data) => {
    const responseData = JSON.stringify({
      parentId: chosenDirectoryId || "1",
      name: data?.directoryName,
    });
    dispatch(directoriesActions.addDirectoryRequest(responseData));
    setIsModalShown(false);
  };

  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const removeButtonHandler = () => {
    setIsAddDirectory(false);
    if (chosenDirectoryId) {
      setIsModalShown(true);
    } else {
      setIsModalShown(false);
      const notificationText = "Please, choose a directory to remove.";
      dispatch(
        appStateActions.setNotification({
          showNotification: true,
          notificationType: NotificationTypes.alertWarning,
          notificationMessage: notificationText,
        })
      );
    }
  };

  const recursiveRemove = (currentId: string) => {
    const arrChildren = directories.filter((item) => item.parentId === currentId) as DirectoryType[];

    arrChildren.length > 0 &&
      arrChildren.forEach((item) => {
        recursiveRemove(String(item.id));
      });

    dispatch(directoriesActions.removeDirectoryRequest(currentId));
  };

  const removeDirectoryHandler = () => {
    recursiveRemove(chosenDirectoryId);

    const path = "/";
    navigate(path, { replace: true });
    setIsModalShown(false);
  };

  const addDirectoryElements = (
    <ToolTip>
      <DirectoryForm submitHandle={onSubmitAddDirectory} modalOnCloseHandle={modalOnCloseHandle} />
    </ToolTip>
  );

  const removeDirectoryElements = (
    <form>
      <p className={classesModal.title}>Are you sure to remove directory?</p>

      <div className="controlsContainer">
        <Button onClickButton={removeDirectoryHandler} title="OK" tooltip="" />
        <Button onClickButton={modalOnCloseHandle} title="Cancel" tooltip="" />
      </div>
    </form>
  );

  return (
    <div className="controlsContainer shadow">
      <Button title="ADD" onClickButton={addButtonHandler} tooltip="Add directory" />
      <Button title="REMOVE" onClickButton={removeButtonHandler} tooltip="Remove directory" />
      {isModalShown && (
        <Modal onClose={modalOnCloseHandle}>{isAddDirectory ? addDirectoryElements : removeDirectoryElements}</Modal>
      )}
    </div>
  );
};

export default DirectoriesControls;
