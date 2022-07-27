import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { directoriesActions } from "../store/directories-slice";
import { appStateActions } from "../store/app-state-slice";

import { NotificationTypes } from "../types/NotificationTypes";
import { DirectoryType } from "../types/DirectoryTypes";

import { URL as url } from "../config/constants";

function* sagaLoadData() {
  try {
    const response: Response = yield call(() => fetch(url.directories));
    if (!response.ok) {
      throw new Error("Something went wrong! Fetching data from backend.");
    }
    const directories: DirectoryType[] = yield response.json();
    yield put(directoriesActions.loadDirectoriesTree(directories));
  } catch (error: any) {
    console.log("fetching error");
    yield put(
      appStateActions.setNotification({
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

  appStateActions.assignAPIerror(false);

  try {
    const response: Response = yield call(() =>
      fetch(url.directories, {
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
      appStateActions.setNotification({
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
      fetch(url.directories + "/a" + action.payload.id, {
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
    yield put(appStateActions.assignAPIerror(true));
  }
  yield put(appStateActions.assignAPIdone(true));

  yield put(
    appStateActions.setNotification({
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
      fetch(url.directories + "/" + action.payload.trim(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!response.ok) {
      throw new Error("Something went wrong/ deleting data from backend!");
    }

    yield put(directoriesActions.removeDirectory(+action.payload));
  } catch (error: any) {
    console.log("deleting error");
    notificationType = NotificationTypes.alertDanger;
    notificationText = error.message;
  } finally {
    yield put(
      appStateActions.setNotification({
        showNotification: true,
        notificationType: notificationType,
        notificationMessage: notificationText,
      })
    );
  }
}

function* sagaDirectories() {
  yield takeLatest("directoriesSlice/loadDataRequest", sagaLoadData);
  yield takeLatest("directoriesSlice/addDirectoryRequest", sagaAddDirectory);
  yield takeLatest("directoriesSlice/updateDirectoryRequest", sagaUpdateDirectory);
  yield takeLatest("directoriesSlice/removeDirectoryRequest", sagaRemoveDirectory);
}

export default sagaDirectories;
