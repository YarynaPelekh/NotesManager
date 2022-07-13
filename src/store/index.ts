import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import appStateSlice from "./app-state-slice";
import directoriesSlice from "./directories-slice";
import notesSlice from "./notes-slice";
import tagsSlice from "./tags-slice";
import searchSlice from "./search-slice";
import sagaDirectories from "./sagaDirectories";
import sagaNotes from "./sagaNotes";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    appStateSlice: appStateSlice.reducer,
    directoriesSlice: directoriesSlice.reducer,
    notesSlice: notesSlice.reducer,
    tagsSlice: tagsSlice.reducer,
    searchSlice: searchSlice.reducer,
  },
  middleware: [saga],
});

saga.run(sagaDirectories);
saga.run(sagaNotes);
export default store;
