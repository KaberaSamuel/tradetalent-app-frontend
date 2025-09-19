import type { RootState } from "@/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: "",
  reducers: {
    updateMessage: (_, action: PayloadAction<string>) => {
      return action.payload;
    },

    clearMessage: () => {
      return "";
    },
  },
});

export const { updateMessage, clearMessage } = messageSlice.actions;
export const messageSelector = (state: RootState) => state.messageReducer;

export default messageSlice.reducer;
