import React from "react";
import { useSelector } from "react-redux";

import DirectoryItem from "./DirectoryItem";

import { DirectoryType } from "../../types/DirectoryTypes";

import classes from "../../styles/Module/DirectoriesTree.module.css";

const getRootId = (arr: DirectoryType[]) => {
  const roots = arr.filter((item) => !item.parentId);
  return roots[0]?.id;
};

const DirectoriesTree = () => {
  const directoriesData = useSelector(
    (state: { directoriesSlice: { directories: DirectoryType[] } }) => state.directoriesSlice.directories
  ) as DirectoryType[];

  const rootId = String(getRootId(directoriesData));

  const renderChildren = (rootId: string) => {
    const arrayChildren = directoriesData.filter((item) => item.parentId === rootId) as DirectoryType[];

    return arrayChildren.map((item) => (
      <div key={item.id}>
        <DirectoryItem item={item} key={item.id} />
        <ul className={classes.ul}>{renderChildren(String(item.id))}</ul>
      </div>
    ));
    // return arrayChildren.map((item) => (
    //   <div key={item.id}>
    //     <DirectoryItem item={item} key={item.id}>
    //       <ul className={classes.ul}>{renderChildren(String(item.id))}</ul>
    //     </DirectoryItem>
    //   </div>
    // ));
    // return arrayChildren.map((item) => (
    //   <li key={item.id}>
    //     {item.name}
    //     <ul className={classes.ul}>{renderChildren(String(item.id))}</ul>
    //   </li>
    // ));
  };

  return (
    <div id="tree" className={classes.tree}>
      <p> Directories Tree</p>
      <ul className={classes.ul}>{renderChildren(rootId)}</ul>
    </div>
  );
};

export default DirectoriesTree;
