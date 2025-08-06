import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./features/messages/messageSlice";

export const store = configureStore({
  reducer: {
    messageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
