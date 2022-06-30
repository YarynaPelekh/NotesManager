import { createSlice } from "@reduxjs/toolkit";

const appStateSlice = createSlice({
  name: "appStateSlice",
  initialState: {
    showNotification: false,
    notificationType: "",
    notificationMessage: "",
  },
  reducers: {
    setState(state, action) {
      state.showNotification = action.payload.showNotification;
      state.notificationType = action.payload.notificationStatus;
      state.notificationMessage = action.payload.notificationMessage;
    },

    resetState(state) {
      state.showNotification = false;
      state.notificationType = "";
      state.notificationMessage = "";
    },
  },
});

export const appStateActions = appStateSlice.actions;

export default appStateSlice;
