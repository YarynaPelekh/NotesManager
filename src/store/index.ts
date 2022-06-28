import { configureStore } from "@reduxjs/toolkit";

import directoriesSlice from "./directories-slice";

const store = configureStore({
  reducer: { directoriesSlice: directoriesSlice.reducer },
});

export default store;
