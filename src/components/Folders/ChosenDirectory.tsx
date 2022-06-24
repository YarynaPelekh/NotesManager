import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { directoriesActions } from "../../store/directories-slice.ts";
import { useEffect } from "react";

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
        <p style={{ fontSize: 12 }}>{` folder ID - ${params.directoryId}`}</p>
      )}
    </div>
  );
};

export default ChosenDirectory;
