import React from "react";

import classes from "./DirectoryItem.module.css";

import { NavLink } from "react-router-dom";

import { PropsDirectoryItem } from "../../types/DirectoryTypes";
import ChosenDirectory from "./ChosenDirectory.tsx";

const DirectoryItem = (props: PropsDirectoryItem) => {
  return (
    <li className={classes.li}>
      <NavLink
        className={({ isActive }) =>
          `${classes.navLink} ${isActive ? classes.chosen : null}`
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
