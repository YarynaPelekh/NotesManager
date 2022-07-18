import { call, put, takeEvery } from "redux-saga/effects";

import { directoriesActions } from "./directories-slice";
import { appStateActions } from "./app-state-slice";

import { NotificationTypes } from "../types/NotificationTypes";
import { ServerResponse } from "http";
import { DirectoryType } from "../types/DirectoryTypes";

function* sagaLoadData() {
  try {
    const response: Response = yield call(() => fetch("http://localhost:3000/directories"));
    if (!response.ok) {
      throw new Error("Something went wrong! Fetching data from backend.");
    }
    const directories: DirectoryType[] = yield response.json();
    yield put(directoriesActions.loadDirectoriesTree(directories));
  } catch (error: any) {
    console.log("fetching error");
    yield put(
      appStateActions.setState({
        showNotification: true,
        notificationType: NotificationTypes.alertDanger,
        notificationMessage: error.message,
      })
    );
  }
}

function* sagaAddDirectory(action: any) {
  let notificationType = NotificationTypes.alertLight;
  let notificationText = "The directory was added successfully";

  try {
    const response: Response = yield call(() =>
      fetch("http://localhost:3000/directories", {
        method: "POST",
        body: action.payload,
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!response.ok) {
      throw new Error("Something went wrong/ sending data to backend!");
    }
    const responseData: DirectoryType = yield response.json();
    yield put(
      directoriesActions.addDirectory({
        id: responseData.id,
        name: responseData.name,
        parentId: responseData.parentId,
      })
    );
  } catch (error: any) {
    console.log("posting error");
    notificationType = NotificationTypes.alertDanger;
    notificationText = error.message;
  } finally {
    yield put(
      appStateActions.setState({
        showNotification: true,
        notificationType: notificationType,
        notificationMessage: notificationText,
      })
    );
  }
}

function* sagaUpdateDirectory(action: any) {
  let notificationText = "The directory renamed successfully";
  let notificationType = NotificationTypes.alertLight;
  try {
    const response: Response = yield call(() =>
      fetch("http://localhost:3000/directories/" + action.payload.id, {
        method: "PUT",
        body: JSON.stringify({
          id: action.payload.id,
          parentId: action.payload.parentId,
          name: action.payload.name,
        }),
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!response.ok) {
      throw new Error("Something went wrong/ sending data to backend!");
    }

    const responseData: DirectoryType = yield response.json();
    yield put(directoriesActions.updateDirectory(responseData));
  } catch (error: any) {
    notificationText = error.message;
    notificationType = NotificationTypes.alertDanger;
  }

  yield put(
    appStateActions.setState({
      showNotification: true,
      notificationType: notificationType,
      notificationMessage: notificationText,
    })
  );
}

function* sagaRemoveDirectory(action: any) {
  let notificationType = NotificationTypes.alertLight;
  let notificationText = "The directory was removed successfully";

  try {
    const response: Response = yield call(() =>
      fetch("http://localhost:3000/directories/" + action.payload.trim(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!response.ok) {
      throw new Error("Something went wrong/ deleting data from backend!");
    }

    yield put(directoriesActions.removeDirectory(+action.payload));
    yield put(directoriesActions.setChosenDirectoryId(""));
  } catch (error: any) {
    console.log("deleting error");
    notificationType = NotificationTypes.alertDanger;
    notificationText = error.message;
  } finally {
    yield put(
      appStateActions.setState({
        showNotification: true,
        notificationType: notificationType,
        notificationMessage: notificationText,
      })
    );
  }
}

function* sagaDirectories() {
  yield takeEvery("directoriesSlice/loadDataRequest", sagaLoadData);
  yield takeEvery("directoriesSlice/addDirectoryRequest", sagaAddDirectory);
  yield takeEvery("directoriesSlice/updateDirectoryRequest", sagaUpdateDirectory);
  yield takeEvery("directoriesSlice/removeDirectoryRequest", sagaRemoveDirectory);
}

export default sagaDirectories;
