import React from "react";
import { NavLink, useParams } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";
import { useDispatch } from "react-redux";

import { PropsDirectoryItem } from "../../types/DirectoryTypes";

import ChosenDirectory from "./ChosenDirectory";

import { directoriesActions } from "../../store/directories-slice";
import { appStateActions } from "../../store/app-state-slice";

import { NotificationTypes } from "../../types/NotificationTypes";

import classes from "../../styles/Module/DirectoryItem.module.css";

const DirectoryItem = (props: PropsDirectoryItem) => {
  const dispatch = useDispatch();

  const saveEdit = (value) => {
    const data = Object.assign({}, props.item, { name: value });
    dispatch(directoriesActions.updateDirectoryRequest(data));
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
          saveButtonLabel="Save"
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
