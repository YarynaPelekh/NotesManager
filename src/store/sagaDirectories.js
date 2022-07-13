import { call, put, takeEvery } from "redux-saga/effects";

import { directoriesActions } from "./directories-slice";
import { appStateActions } from "./app-state-slice";

import { NotificationTypes } from "../types/NotificationTypes";

function* sagaGetData() {
  try {
    const response = yield call(() => fetch("http://localhost:3000/directories"));
    if (!response.ok) {
      throw new Error("Something went wrong! Fetching data from backend.");
    }
    const directories = yield response.json();
    yield put(directoriesActions.loadDirectoriesTree(directories));
  } catch (error) {
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

function* sagaAddDirectory(action) {
  let notificationType = NotificationTypes.alertLight;
  let notificationText = "The directory was added successfully";

  try {
    const response = yield fetch("http://localhost:3000/directories", {
      method: "POST",
      body: action.payload,
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Something went wrong/ sending data to backend!");
    }
    const responseData = yield response.json();
    yield put(
      directoriesActions.addDirectory({
        id: responseData.id,
        name: responseData.name,
        parentId: responseData.parentId,
      })
    );
  } catch (error) {
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

function* sagaUpdateDirectory(action) {
  let notificationText = "The directory renamed successfully";
  let notificationType = NotificationTypes.alertLight;
  try {
    const response = yield fetch("http://localhost:3000/directories/" + action.payload.id, {
      method: "PUT",
      body: JSON.stringify({
        id: action.payload.id,
        parentId: action.payload.parentId,
        name: action.payload.name,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Something went wrong/ sending data to backend!");
    }

    yield put(directoriesActions.updateDirectory(action.payload));
  } catch (error) {
    if (error instanceof Error) {
      notificationText = error.message;
      notificationType = NotificationTypes.alertDanger;
    }
  }

  yield put(
    appStateActions.setState({
      showNotification: true,
      notificationType: notificationType,
      notificationMessage: notificationText,
    })
  );
}

function* sagaRemoveDirectory(action) {
  let notificationType = NotificationTypes.alertLight;
  let notificationText = "The directory was removed successfully";

  try {
    const response = yield fetch("http://localhost:3000/directories/" + action.payload.trim(), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Something went wrong/ deleting data from backend!");
    }

    yield put(directoriesActions.removeDirectory(+action.payload));
    yield put(directoriesActions.setChosenDirectoryId(""));
  } catch (error) {
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
  yield takeEvery("directoriesSlice/getDataRequest", sagaGetData);
  yield takeEvery("directoriesSlice/addDirectoryRequest", sagaAddDirectory);
  yield takeEvery("directoriesSlice/updateDirectoryRequest", sagaUpdateDirectory);
  yield takeEvery("directoriesSlice/removeDirectoryRequest", sagaRemoveDirectory);
}

export default sagaDirectories;
