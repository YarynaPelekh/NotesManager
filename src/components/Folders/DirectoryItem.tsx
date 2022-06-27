import React from "react";

import { NavLink } from "react-router-dom";

import { PropsDirectoryItem } from "../../types/DirectoryTypes";

// @ts-ignore
import ChosenDirectory from "./ChosenDirectory.tsx";

import classes from "./DirectoryItem.module.css";

const DirectoryItem = (props: PropsDirectoryItem) => {
  return (
    <li className={classes.li}>
      <NavLink
        className={({ isActive }) =>
          `${classes.directory} ${isActive ? classes.chosen : null}`
        }
        to={`/directories/${props.item.id}`}
        key={props.item.id}
      >
        {props.item.name}
        <ChosenDirectory directoryId={props.item.id} />
      </NavLink>

      {props.children}
    </li>
  );
};

export default DirectoryItem;
