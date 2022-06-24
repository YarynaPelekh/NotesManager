import React, { useState } from "react";

import classes from "./DirectoryItem.module.css";

import { NavLink } from "react-router-dom";

import { PropsDirectoryItem } from "../../types/DirectoryTypes";
import ChosenDirectory from "./ChosenDirectory.tsx";

const DirectoryItem = (props: PropsDirectoryItem) => {
  return (
    <li className={classes.li}>
      <NavLink
        style={({ isActive }) => {
          return {
            display: "block",
            margin: "1rem 0",
            color: isActive ? "green" : "",
          };
        }}
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
