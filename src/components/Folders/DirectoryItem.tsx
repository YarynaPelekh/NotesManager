import React, { Fragment } from "react";
import { NavLink, useParams } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";
import { useDispatch } from "react-redux";

import { PropsDirectoryItem } from "../../types/DirectoryTypes";

import ChosenDirectory from "./ChosenDirectory";
import ToolTip from "../UI/ToolTip";

import { directoriesActions } from "../../store/directories-slice";

import classes from "../../styles/Module/DirectoryItem.module.css";

const DirectoryItem = (props: PropsDirectoryItem) => {
  const dispatch = useDispatch();

  const saveEdit = (value) => {
    const data = Object.assign({}, props.item, { name: value });
    dispatch(directoriesActions.updateDirectoryRequest(data));
  };

  return (
    <li className={classes.li}>
      <ToolTip>
        <Fragment>
          <NavLink
            className={({ isActive }) => `${classes.directory} ${isActive ? classes.chosen : null}`}
            to={`/directories/${props.item.id}`}
            key={props.item.id}
            data-tip="Choose directory"
          />
          <div data-tip="In-line edit title">
            <EasyEdit
              type={Types.TEXT}
              onSave={saveEdit}
              // onCancel={}
              saveButtonLabel="Save"
              cancelButtonLabel="Cancel"
              attributes={{ name: "awesome-input", id: 1 }}
              value={props.item.name}
            />
          </div>
          <ChosenDirectory directoryId={props.item.id} />
        </Fragment>
      </ToolTip>
    </li>
  );
};

export default DirectoryItem;
