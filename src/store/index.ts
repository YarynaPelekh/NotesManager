import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import appStateSlice from "./app-state-slice";
import directoriesSlice from "./directories-slice";
import notesSlice from "./notes-slice";
import tagsSlice from "./tags-slice";
import sagaDirectories from "./saga-directories";
import sagaNotes from "./saga-notes";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    appStateSlice: appStateSlice.reducer,
    directoriesSlice: directoriesSlice.reducer,
    notesSlice: notesSlice.reducer,
    tagsSlice: tagsSlice.reducer,
  },
  middleware: [saga],
});

saga.run(sagaDirectories);
saga.run(sagaNotes);
export default store;
