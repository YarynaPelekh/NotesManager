import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./app-state-slice";
import directoriesSlice from "./directories-slice";
import notesSlice from "./notes-slice";
import tagsSlice from "./tags-slice";
import searchSlice from "./search-slice";

const store = configureStore({
  reducer: {
    appStateSlice: appStateSlice.reducer,
    directoriesSlice: directoriesSlice.reducer,
    notesSlice: notesSlice.reducer,
    tagsSlice: tagsSlice.reducer,
    searchSlice: searchSlice.reducer,
  },
});

export default store;
