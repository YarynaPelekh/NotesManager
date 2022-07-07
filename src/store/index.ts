import { configureStore } from "@reduxjs/toolkit";
// import appStateSlice, { appStateActions } from "./app-state-slice";
import appStateSlice from "./app-state-slice";
import directoriesSlice from "./directories-slice";
import notesSlice from "./notes-slice";
import tagsSlice from "./tags-slice";

const store = configureStore({
  reducer: {
    appStateSlice: appStateSlice.reducer,
    directoriesSlice: directoriesSlice.reducer,
    notesSlice: notesSlice.reducer,
    tagsSlice: tagsSlice.reducer,
  },
});

export default store;
