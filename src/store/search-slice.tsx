import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    searchValues: [] as string[],
    advancedSearchMode: false,
  },
  reducers: {
    storeSearchValues(state, action) {
      state.searchValues = [...action.payload];
    },
    setAdvancedSearchMode(state, action) {
      state.advancedSearchMode = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
