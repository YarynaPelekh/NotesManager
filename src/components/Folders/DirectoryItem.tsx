import React from "react";

import classes from "./DirectoryItem.module.css";

import { useSelector } from "react-redux";

import { Link, Outlet } from "react-router-dom";

import { PropsDirectoryItem } from "../../types/DirectoryTypes";
import { directoriesActions } from "../../store/directories-slice.ts";

const DirectoryItem = (props: PropsDirectoryItem) => {
  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: boolean } }) =>
      state.directoriesSlice.chosenDirectoryId
  );

  return (
    <li className={classes.li}>
      <Link
        to={`/directories/${props.item.id}`}
        key={props.item.id}
        // onClick={directoryClickHandle}
      >
        {props.item.name}
      </Link>
      <Outlet />
      {props.children}
    </li>
  );
};

export default DirectoryItem;
