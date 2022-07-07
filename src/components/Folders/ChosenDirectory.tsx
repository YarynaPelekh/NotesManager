import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { directoriesActions } from "../../store/directories-slice";

import classes from "../../styles/Module/ChosenDirectory.module.css";

const ChosenDirectory = (props: { directoryId: number }) => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (!!params.directoryId) {
      dispatch(directoriesActions.setChosenDirectoryId(params.directoryId));
    }
  }, [dispatch, params.directoryId]);

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) => state.directoriesSlice.chosenDirectoryId
  );

  return (
    <div>
      {props.directoryId === +chosenDirectoryId && <p className={classes.p}>{` folder ID - ${chosenDirectoryId}`}</p>}
    </div>
  );
};

export default ChosenDirectory;
