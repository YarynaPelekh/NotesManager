import { configureStore } from "@reduxjs/toolkit";
// import appStateSlice, { appStateActions } from "./app-state-slice";
import appStateSlice from "./app-state-slice";

import directoriesSlice from "./directories-slice";

const store = configureStore({
  reducer: {
    directoriesSlice: directoriesSlice.reducer,
    appStateSlice: appStateSlice.reducer,
  },
});

export default store;
