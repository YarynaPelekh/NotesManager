import { createSlice } from "@reduxjs/toolkit";

import { DirectoryType } from "../types/type";

const directoriesSlice = createSlice({
  name: "directoriesSlice",
  initialState: { directories: [] as DirectoryType[] },
  reducers: {
    addDirectory(state, action) {
      state.directories.push(action.payload);
    },

    loadDirectoriesTree(state, action) {
      action.payload.forEach((item) => {
        state.directories.push(item);
      });
    },
  },
});

export const directoriesActions = directoriesSlice.actions;

export default directoriesSlice;
