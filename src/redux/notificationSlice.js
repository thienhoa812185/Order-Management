import { createSlice } from "@reduxjs/toolkit";

const notifications =
  localStorage.getItem("notifications") !== null
    ? JSON.parse(localStorage.getItem("notifications"))
    : [];

const notificationsQuantity =
  localStorage.getItem("notificationsQuantity") !== null
    ? JSON.parse(localStorage.getItem("notificationsQuantity"))
    : 0;

const setNotificationLocalStorage = ( notifications, notificationsQuantity) => {
  localStorage.setItem("notifications", JSON.stringify(notifications));
  localStorage.setItem("notificationsQuantity", JSON.stringify(notificationsQuantity));
};

const initialState = {
  notifications: notifications,
  notificationsQuantity: notificationsQuantity
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {

    // =========== add item ============
    addNotification(state, action) {
      const newNotification = action.payload;
      state.notifications.push(newNotification)
      state.notificationsQuantity++;
      setNotificationLocalStorage(state.notifications, state.notificationsQuantity)
    },

    //============ delete item ===========
    deleteItem(state, action) {
      const id = action.payload.id;
      const existingNotification = state.notifications.find((notification) => notification.id === id);
      if (existingNotification) {
        state.notifications = state.notifications.filter((notification) => notification.id !== id)
        state.totalQuantity = state.totalQuantity--;
      }
      setNotificationLocalStorage(state.notifications, state.notificationsQuantity)
    },
  },
});

export default notificationSlice;
