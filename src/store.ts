import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "@/features/popups/messageSlice";
import authReducer from "@/features/auth/authSlice";
import activitiesReducer from "@/features/home/ActivitiesSlice";

export const store = configureStore({
  reducer: {
    messageReducer,
    authReducer,
    activitiesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
