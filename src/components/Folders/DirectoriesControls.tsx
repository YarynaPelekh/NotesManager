import { useState } from "react";
import ReactDOM from "react-dom";

import { useSelector } from "react-redux";

import AddButton from "./Buttons/AddButton";
import RemoveButton from "./Buttons/RemoveButton";

import Notification from "../UI/Notification";

import classes from "./DirectoriesControls.module.css";

const portalElement = document.getElementById("overlay") as HTMLElement;

const DirectoriesControls = () => {
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);

  const chosenDirectoryId = useSelector(
    (state: { directoriesSlice: { chosenDirectoryId: string } }) =>
      state.directoriesSlice.chosenDirectoryId
  );

  const addSuccessHandler = (isSuccess: boolean) => {
    setIsAddSuccess(isSuccess);
  };

  const removeSuccessHandler = (isSuccess: boolean) => {
    setIsRemoveSuccess(isSuccess);
  };

  return (
    <div className={classes.controlsContainer}>
      <AddButton onAddSuccess={addSuccessHandler} />
      <RemoveButton onRemoveSuccess={removeSuccessHandler} />
      {isAddSuccess &&
        ReactDOM.createPortal(
          <Notification
            notificationText="The directory was added successfully"
            onClose={() => {
              setIsAddSuccess(false);
            }}
          />,
          portalElement
        )}
      {isRemoveSuccess &&
        chosenDirectoryId &&
        ReactDOM.createPortal(
          <Notification
            notificationText="The directory was removed successfully"
            onClose={() => {
              setIsRemoveSuccess(false);
            }}
          />,
          portalElement
        )}
      {isRemoveSuccess &&
        !chosenDirectoryId &&
        ReactDOM.createPortal(
          <Notification
            notificationText="Please, choose a directory to remove."
            onClose={() => {
              setIsRemoveSuccess(false);
            }}
          />,
          portalElement
        )}
    </div>
  );
};

export default DirectoriesControls;
