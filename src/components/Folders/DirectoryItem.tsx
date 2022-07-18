import React, { Fragment } from "react";
import { NavLink, useParams } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";
import { useDispatch } from "react-redux";

import { DirectoryType, PropsDirectoryItem } from "../../types/DirectoryTypes";

import ChosenDirectory from "./ChosenDirectory";
import ToolTip from "../UI/ToolTip";

import { directoriesActions } from "../../store/directories-slice";

import classes from "../../styles/Module/DirectoryItem.module.css";

const DirectoryItem = (props: { item: DirectoryType }) => {
  // const DirectoryItem = (props: PropsDirectoryItem) => {
  const dispatch = useDispatch();

  const saveEdit = (value) => {
    const data = Object.assign({}, props.item, { name: value });
    dispatch(directoriesActions.updateDirectoryRequest(data));
  };

  return (
    <li className={classes.li} key={props.item.id}>
      <ToolTip>
        <div
          data-tip="Choose directory"
          onClick={() => dispatch(directoriesActions.setChosenDirectoryId(String(props.item.id)))}
        >
          <NavLink
            className={({ isActive }) => `${classes.directory} ${isActive ? classes.chosen : null}`}
            to={`/directories/${props.item.id}`}
            key={props.item.id}
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
            {/* <ChosenDirectory directoryId={props.item.id} /> */}
          </div>
        </div>
      </ToolTip>
    </li>
  );
};

export default DirectoryItem;
