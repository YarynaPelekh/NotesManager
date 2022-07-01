import { createSlice } from "@reduxjs/toolkit";

//@ts-ignore
import { DirectoryType } from "../types/type";

const directoriesSlice = createSlice({
  name: "directoriesSlice",
  initialState: {
    dataIsLoaded: false,
    chosenDirectoryId: null,
    directories: [] as DirectoryType[],
  },
  reducers: {
    setChosenDirectoryId(state, action) {
      state.chosenDirectoryId = action.payload;
    },

    addDirectory(state, action) {
      state.directories.push(action.payload);
    },

    updateDirectory(state, action) {
      console.log("updateDirectory", action.payload);
      const arr = state.directories.map((item) => {
        return item.id === action.payload.id
          ? Object.assign(item, { name: action.payload.name })
          : item;
      });
    },

    removeDirectory(state, action) {
      state.directories = state.directories.filter(
        (item) => item.id !== action.payload
      );
    },

    loadDirectoriesTree(state, action) {
      action.payload.forEach((item: DirectoryType) => {
        state.directories.push(item);
      });
      state.dataIsLoaded = true;
    },
  },
});

export const directoriesActions = directoriesSlice.actions;

export default directoriesSlice;
