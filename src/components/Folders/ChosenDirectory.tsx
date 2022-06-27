import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

// @ts-ignore
import { directoriesActions } from "../../store/directories-slice.ts";
import { useEffect } from "react";

import classes from "./ChosenDirectory.module.css";

const ChosenDirectory = (props: { directoryId: number }) => {
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    if (params.directoryId) {
      dispatch(directoriesActions.setChosenDirectoryId(params.directoryId));
    }
  }, [dispatch, params.directoryId]);

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) =>
      state.directoriesSlice.chosenDirectoryId
  );

  return (
    <div>
      {props.directoryId === +chosenDirectoryId && (
        <p className={classes.p}>{` folder ID - ${params.directoryId}`}</p>
      )}
    </div>
  );
};

export default ChosenDirectory;
