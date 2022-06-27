import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// @ts-ignore
import { directoriesActions } from "../../store/directories-slice.ts";

// @ts-ignore
import DirectoryItem from "./DirectoryItem.tsx";

import { DirectoryType } from "../../types/DirectoryTypes";

import classes from "./DirectoriesTree.module.css";

const getRootId = (arr: DirectoryType[]) => {
  const roots = arr.filter((item) => !item.parentId);
  return roots[0]?.id;
};

const DirectoriesTree = () => {
  const dispatch = useDispatch();

  const dataIsLoaded = useSelector(
    (state: { directoriesSlice: { dataIsLoaded: boolean } }) =>
      state.directoriesSlice.dataIsLoaded
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/directories");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();

      dispatch(directoriesActions.loadDirectoriesTree(responseData));
    };

    if (!dataIsLoaded) {
      fetchData().catch((error) => {
        console.log("fetching error");
      });
    }
  }, [dataIsLoaded, dispatch]);

  const directoriesData = useSelector(
    (state: { directoriesSlice: { directories: DirectoryType[] } }) =>
      state.directoriesSlice.directories
  ) as DirectoryType[];

  const rootId = String(getRootId(directoriesData));

  const renderChildren = (rootId: string) => {
    const arrayChildren = directoriesData.filter(
      (item) => item.parentId === rootId
    ) as DirectoryType[];

    return arrayChildren.map((item) => (
      <DirectoryItem item={item} key={Math.random()}>
        <ul className={classes.ul}>{renderChildren(String(item.id))}</ul>
      </DirectoryItem>
    ));
  };

  return (
    <div id="tree" className={classes.tree}>
      <div>{renderChildren(rootId)}</div>
    </div>
  );
};

export default DirectoriesTree;
