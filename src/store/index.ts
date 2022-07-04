import { configureStore } from "@reduxjs/toolkit";
// import appStateSlice, { appStateActions } from "./app-state-slice";
import appStateSlice from "./app-state-slice";

import directoriesSlice from "./directories-slice";
import notesSlice from "./notes-slice";

const store = configureStore({
  reducer: {
    directoriesSlice: directoriesSlice.reducer,
    notesSlice: notesSlice.reducer,
    appStateSlice: appStateSlice.reducer,
  },
});

export default store;
