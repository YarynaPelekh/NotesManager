import React from "react";
import ReactDOM from "react-dom";

import Directories from "./Folders/Directories";
import Notes from "./Notes/Notes";
import Notification from "./UI/Notification";
import RequireAuth from "./Auth/RequireAuth";

import { useDispatch, useSelector } from "react-redux";

import { appStateActions } from "../store/app-state-slice";

import { AppStateType } from "../types/AppStateType";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/common.css";
import classes from "../styles/Module/MainPage.module.css";

const portalElement = document.getElementById("overlay") as HTMLElement;

const MainPage = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: { appStateSlice: AppStateType }) => state.appStateSlice);

  return (
    <RequireAuth>
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
    </RequireAuth>
  );
};

export default MainPage;
