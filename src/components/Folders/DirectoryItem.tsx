import React from "react";
import { NavLink } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";
import { useDispatch } from "react-redux";

import { PropsDirectoryItem } from "../../types/DirectoryTypes";

import ChosenDirectory from "./ChosenDirectory";

import { directoriesActions } from "../../store/directories-slice";
import { appStateActions } from "../../store/app-state-slice";

import { NotificationTypes } from "../../types/NotificationTypes";

import classes from "../../styles/Module/DirectoryItem.module.css";

const DirectoryItem = (props: PropsDirectoryItem) => {
  let notificationText = "The directory renamed successfully";
  let notificationType = NotificationTypes.alertLight;

  const dispatch = useDispatch();

  const saveEdit = async (value) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/directories/" + props.item.id, {
        method: "PUT",
        body: JSON.stringify({
          id: props.item.id,
          parentId: props.item.parentId,
          name: value,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Something went wrong/ sending data to backend!");
      }

      dispatch(directoriesActions.updateDirectory(Object.assign({}, props.item, { name: value })));
    };

    try {
      await fetchData().catch((error) => {
        throw new Error(error.message);
      });
    } catch (error) {
      if (error instanceof Error) {
        notificationText = error.message;
        notificationType = NotificationTypes.alertDanger;
      }
    }

    dispatch(
      appStateActions.setState({
        showNotification: true,
        notificationType: notificationType,
        notificationMessage: notificationText,
      })
    );
  };

  return (
    <li className={classes.li}>
      <NavLink
        className={({ isActive }) => `${classes.directory} ${isActive ? classes.chosen : null}`}
        to={`/directories/${props.item.id}`}
        key={props.item.id}
      >
        <EasyEdit
          type={Types.TEXT}
          onSave={saveEdit}
          // onCancel={}
          saveButtonLabel="OK"
          cancelButtonLabel="Cancel"
          attributes={{ name: "awesome-input", id: 1 }}
          value={props.item.name}
        />
        <ChosenDirectory directoryId={props.item.id} />
      </NavLink>

      {props.children}
    </li>
  );
};

export default DirectoryItem;
