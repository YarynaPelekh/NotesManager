import { createSlice } from "@reduxjs/toolkit";

import { AppStateType } from "../types/AppStateType";

const appStateSlice = createSlice({
  name: "appStateSlice",
  initialState: {
    notification: {
      showNotification: false,
      notificationType: "",
      notificationMessage: "",
    },
  },
  reducers: {
    setNotification(state, action) {
      state = Object.assign(state.notification, action.payload);
    },

    resetNotification(state) {
      state.notification.showNotification = false;
      state.notification.notificationType = "";
      state.notification.notificationMessage = "";
    },
  },
});

export const appStateActions = appStateSlice.actions;

export default appStateSlice;
