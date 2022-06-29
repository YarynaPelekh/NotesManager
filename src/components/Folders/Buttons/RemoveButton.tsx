import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Modal from "../../UI/Modal";

import { directoriesActions } from "../../../store/directories-slice";

import classes from "./AddButton.module.css";

const RemoveButton = (props: {
  onRemoveSuccess: (isSuccess: boolean) => void;
}) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) =>
      state.directoriesSlice.chosenDirectoryId
  );

  const removeButtonHandler = () => {
    if (chosenDirectoryId) {
      setIsModalShown(true);
    } else {
      props.onRemoveSuccess(true);
      console.log("Directory not chosen");
    }
  };

  const removeDirectoryHandler = () => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3000/directories/" + chosenDirectoryId.trim(),
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong/ deleting data from backend!");
      }
      dispatch(directoriesActions.removeDirectory(+chosenDirectoryId));
    };

    fetchData().catch((error) => {
      console.log(error);
    });

    setIsModalShown(false);
    props.onRemoveSuccess(true);
    dispatch(directoriesActions.setChosenDirectoryId(""));

    const path =
      ".." + location.pathname.slice(0, location.pathname.lastIndexOf("/"));

    navigate(path, { replace: true });
  };
  const modalOnCloseHandle = () => {
    setIsModalShown(false);
  };

  const removeDirectoryElements = (
    <Fragment>
      <p>Are you sure to remove directory?</p>

      <div className={classes.controlsContainer}>
        <button onClick={removeDirectoryHandler}>OK</button>
        <button onClick={modalOnCloseHandle}>Cancel</button>
      </div>
    </Fragment>
  );

  return (
    <div>
      {isModalShown && (
        <Modal onClose={modalOnCloseHandle}>{removeDirectoryElements}</Modal>
      )}
      <button onClick={removeButtonHandler}>REMOVE</button>
    </div>
  );
};
export default RemoveButton;
