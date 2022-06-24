import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { directoriesActions } from "../../store/directories-slice.ts";

const ChosenDirectory = () => {
  const dispatch = useDispatch();
  let params = useParams();

  dispatch(directoriesActions.setChosenDirectoryId(params.directoryId));
  console.log("ChosenDirectory render");

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) =>
      state.directoriesSlice.chosenDirectoryId
  );
  return <p>{` folder ID - ${params.directoryId}`}</p>;
};

export default ChosenDirectory;
