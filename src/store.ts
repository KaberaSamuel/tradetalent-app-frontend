import authReducer from "@/features/auth/authSlice";
import conversationReducer from "@/features/chat/chatSlice";
import activitiesReducer from "@/features/home/ActivitiesSlice";
import navigationReducer from "@/features/navigation/navigationSlice";
import notificationsReducer from "@/features/notifications/notificationsSlice";
import messageReducer from "@/features/popups/messageSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    messageReducer,
    authReducer,
    activitiesReducer,
    navigationReducer,
    conversationReducer,
    notificationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
