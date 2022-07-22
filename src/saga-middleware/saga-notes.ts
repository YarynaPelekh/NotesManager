import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { notesActions } from "../store/notes-slice";
import { appStateActions } from "../store/app-state-slice";
import { tagsActions } from "../store/tags-slice";

import { NotificationTypes } from "../types/NotificationTypes";
import { NoteType } from "../types/NotesTypes";

import { URL as url } from "../config/constants";

function* sagaLoadNote(action: any) {
  try {
    const response: Response = yield call(() => fetch(url.notes));

    if (!response.ok) {
      throw new Error("Something went wrong! Fetching data from backend.");
    }
    const responseData: NoteType[] = yield response.json();

    const loadedData = [];
    responseData.forEach((item) => {
      loadedData.push({ item });
    });
    yield put(notesActions.loadNotes(responseData));

    const tagsString = responseData
      .map((item) => {
        return item.tags;
      })
      .join()
      .split(",")
      .filter((v, i, a) => a.indexOf(v) === i)
      .join();

    yield put(tagsActions.loadTags(tagsString));
  } catch (error: any) {
    yield put(
      appStateActions.setNotification({
        showNotification: true,
        notificationType: NotificationTypes.alertDanger,
        notificationMessage: error.message,
      })
    );
  }
}

function* sagaAddNote(action: any) {
  let notificationText = "The note was added successfully";
  let notificationType = NotificationTypes.alertLight;

  try {
    const response: Response = yield call(() =>
      fetch(url.notes, {
        method: "POST",
        body: JSON.stringify({
          description: action.payload.description,
          directoryId: action.payload.directoryId,
          tags: action.payload.tags,
          title: action.payload.title,
        }),
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!response.ok) {
      throw new Error("Something went wrong/ sending data to backend!");
    }
    const responseData: NoteType = yield response.json();
    yield put(
      notesActions.addNote({
        description: responseData.description,
        directoryId: responseData.directoryId,
        id: responseData.id,
        position: responseData.position,
        tags: responseData.tags,
        title: responseData.title,
      })
    );
    yield put(tagsActions.updateTags(responseData.tags));
  } catch (error: any) {
    notificationText = error.message;
    notificationType = NotificationTypes.alertDanger;
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

function* sagaEditNote(action: any) {
  let notificationText = "The note was edited successfully";
  let notificationType = NotificationTypes.alertLight;

  try {
    const response: Response = yield call(() =>
      fetch(url.notes + "/" + String(action.payload.id), {
        method: "PUT",
        body: JSON.stringify(action.payload),
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!response.ok) {
      throw new Error("Something went wrong/ sending data to backend!");
    }

    const responseData: NoteType = yield response.json();
    yield put(notesActions.updateNote(responseData));

    yield put(tagsActions.updateTags(responseData.tags));
  } catch (error: any) {
    notificationText = error.message;
    notificationType = NotificationTypes.alertDanger;
  }

  yield put(
    appStateActions.setNotification({
      showNotification: true,
      notificationType: notificationType,
      notificationMessage: notificationText,
    })
  );
}

function* sagaRemoveNote(action: any) {
  let notificationText = "";
  let notificationType = NotificationTypes.alertSecondary;
  let errorText = "";

  try {
    const response: Response = yield call(() =>
      fetch(url.notes + "/" + String(action.payload), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!response.ok) {
      throw new Error("Something went wrong/ deleting data from backend!");
    }
    yield put(notesActions.removeNote(action.payload));
  } catch (error: any) {
    errorText = error.message;
  }

  if (errorText) {
    notificationText = errorText;
    notificationType = NotificationTypes.alertDanger;
  } else {
    notificationText = "The note was removed successfully";
  }

  yield put(
    appStateActions.setNotification({
      showNotification: true,
      notificationType: notificationType,
      notificationMessage: notificationText,
    })
  );
}

function* sagaNotes() {
  yield takeLatest("notesSlice/loadNotesRequest", sagaLoadNote);
  yield takeLatest("notesSlice/addNoteRequest", sagaAddNote);
  //should be tekeEvery - else DnD doesn't update position of all notes
  yield takeEvery("notesSlice/editNoteRequest", sagaEditNote);
  yield takeLatest("notesSlice/removeNoteRequest", sagaRemoveNote);
}

export default sagaNotes;
