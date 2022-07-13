import { call, put, takeEvery } from "redux-saga/effects";

import { notesActions } from "./notes-slice";
import { appStateActions } from "./app-state-slice";
import { tagsActions } from "./tags-slice";

import { NotificationTypes } from "../types/NotificationTypes";
import { NoteType } from "../types/NotesTypes";

function* sagaLoadNote(action) {
  try {
    const response = yield fetch("http://localhost:3000/notices");

    if (!response.ok) {
      throw new Error("Something went wrong! Fetching data from backend.");
    }
    const responseData = yield response.json();

    const loadedData = [];
    responseData.forEach((item) => {
      loadedData.push({
        description: item.description,
        directoryId: item.directoryId,
        id: item.id,
        position: item.position,
        tags: item.tags,
        title: item.title,
      });
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
  } catch (error) {
    console.log("loading notes error", error.message);
    yield put(
      appStateActions.setState({
        showNotification: true,
        notificationType: NotificationTypes.alertDanger,
        notificationMessage: error.message,
      })
    );
  }
}

function* sagaAddNote(action) {
  console.log("sagaAddNote", action.payload);

  let notificationText = "The note was added successfully";
  let notificationType = NotificationTypes.alertLight;

  try {
    const response = yield fetch("http://localhost:3000/notices", {
      method: "POST",
      body: JSON.stringify({
        description: action.payload.description,
        directoryId: action.payload.directoryId,
        tags: action.payload.tags,
        title: action.payload.title,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Something went wrong/ sending data to backend!");
    }
    const responseData = yield response.json();
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
  } catch (error) {
    if (error instanceof Error) {
      notificationText = error.message;
      notificationType = NotificationTypes.alertDanger;
    }
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

function* sagaNotes() {
  yield takeEvery("notesSlice/loadNotesRequest", sagaLoadNote);
  yield takeEvery("notesSlice/addNoteRequest", sagaAddNote);
}

export default sagaNotes;
