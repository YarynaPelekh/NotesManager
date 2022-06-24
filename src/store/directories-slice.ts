import { createSlice } from "@reduxjs/toolkit";

import { DirectoryType } from "../types/type";

const directoriesSlice = createSlice({
  name: "directoriesSlice",
  initialState: {
    dataIsLoaded: false,
    chosenDirectoryId: 0,
    directories: [] as DirectoryType[],
  },
  reducers: {
    setChosenDirectoryId(state, action) {
      state.chosenDirectoryId = action.payload;
    },

    addDirectory(state, action) {
      state.directories.push(action.payload);
    },

    loadDirectoriesTree(state, action) {
      action.payload.forEach((item) => {
        state.directories.push(item);
      });
      state.dataIsLoaded = true;
    },
  },
});

export const directoriesActions = directoriesSlice.actions;

export default directoriesSlice;
