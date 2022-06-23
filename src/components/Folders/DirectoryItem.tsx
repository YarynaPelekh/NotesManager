import React from "react";

import classes from "./DirectoryItem.module.css";

import { PropsDirectoryItem } from "../../types/DirectoryTypes";

const DirectoryItem = (props: PropsDirectoryItem) => {
  return (
    <li className={classes.li}>
      {props.item.name}
      {props.children}
    </li>
  );
};

export default DirectoryItem;
