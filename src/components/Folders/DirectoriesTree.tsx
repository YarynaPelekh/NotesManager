import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DirectoryItem from "./DirectoryItem";

import { directoriesActions } from "../../store/directories-slice";

import { DirectoryType } from "../../types/DirectoryTypes";

import classes from "../../styles/Module/DirectoriesTree.module.css";

const getRootId = (arr: DirectoryType[]) => {
  const roots = arr.filter((item) => !item.parentId);
  return roots[0]?.id;
};

const DirectoriesTree = () => {
  const dispatch = useDispatch();

  const dataIsLoaded = useSelector(
    (state: { directoriesSlice: { dataIsLoaded: boolean } }) => state.directoriesSlice.dataIsLoaded
  );

  const directoriesData = useSelector(
    (state: { directoriesSlice: { directories: DirectoryType[] } }) => state.directoriesSlice.directories
  ) as DirectoryType[];

  // useEffect(() => {
  //   dispatch(directoriesActions.loadDataRequest());
  // }, []);

  const rootId = String(getRootId(directoriesData));

  const renderChildren = (rootId: string) => {
    const arrayChildren = directoriesData.filter((item) => item.parentId === rootId) as DirectoryType[];

    return arrayChildren.map((item) => (
      <DirectoryItem item={item} key={Math.random()}>
        <ul className={classes.ul}>{renderChildren(String(item.id))}</ul>
      </DirectoryItem>
    ));
  };

  return (
    <div id="tree" className={classes.tree}>
      <p> Directories Tree</p>
      <div>{renderChildren(rootId)}</div>
    </div>
  );
};

export default DirectoriesTree;
