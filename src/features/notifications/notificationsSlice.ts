import type { RootState } from "@/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface notificationsSliceProps {
  unreadMessagesCount: number;
}

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { unreadMessagesCount: 0 },
  reducers: {
    updateUnreadMessagesCount: (state, action: PayloadAction<number>) => {
      state.unreadMessagesCount = action.payload;
    },
  },
});

export const { updateUnreadMessagesCount } = notificationsSlice.actions;
export const notificationsSelector = (state: RootState) =>
  state.notificationsReducer;

export default notificationsSlice.reducer;
