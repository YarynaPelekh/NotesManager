import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
  name: "tagsSlice",
  initialState: {
    tags: [] as string[],
  },
  reducers: {
    addTag(state, action) {
      state.tags.push(action.payload);
    },
    updateTags(state, action) {
      state.tags = state.tags.concat(action.payload.split(",")).filter((v, i, a) => a.indexOf(v) === i);
    },
    loadTags(state, action) {
      state.tags = action.payload.split(",");
    },
  },
});

export const tagsActions = tagsSlice.actions;

export default tagsSlice;
