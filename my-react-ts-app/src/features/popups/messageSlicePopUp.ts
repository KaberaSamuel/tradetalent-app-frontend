import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

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
