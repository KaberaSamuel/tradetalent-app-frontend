import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "@/features/popups/messageSlice";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    messageReducer,
    authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
