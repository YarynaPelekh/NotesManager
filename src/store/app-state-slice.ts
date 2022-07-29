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
    APIerror: false,
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

    assignAPIerror(state, action) {
      state.APIerror = action.payload;
    },
  },
});

export const appStateActions = appStateSlice.actions;

export default appStateSlice;
