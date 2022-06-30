import ReactDOM from "react-dom";

import Directories from "../Folders/Directories";
import Notes from "../Notes/Notes";
import Notification from "./Notification";

import { useDispatch, useSelector } from "react-redux";

import { appStateActions } from "../../store/app-state-slice";

import { AppStateType } from "../../types/AppStateType";

import classes from "./MainPage.module.css";

const portalElement = document.getElementById("overlay") as HTMLElement;

const MainPage = () => {
  const dispatch = useDispatch();
  const appState = useSelector(
    (state: { appStateSlice: AppStateType }) => state.appStateSlice
  );

  return (
    <div className={classes.main}>
      <Directories />
      <Notes />
      {appState.showNotification &&
        ReactDOM.createPortal(
          <Notification
            notification={appState}
            onClose={() => {
              dispatch(appStateActions.resetState());
            }}
          />,
          portalElement
        )}
    </div>
  );
};

export default MainPage;
