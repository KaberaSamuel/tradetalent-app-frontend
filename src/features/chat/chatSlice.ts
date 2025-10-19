import type { ConversationTypes } from "@/App.types";
import type { RootState } from "@/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const conversationSlice = createSlice({
  name: "chat",
  initialState: {},
  reducers: {
    updateActiveConvesation: (_, action: PayloadAction<ConversationTypes>) => {
      return action.payload;
    },
  },
});

export const { updateActiveConvesation } = conversationSlice.actions;
export const conversationSelector = (state: RootState) =>
  state.conversationReducer;

export default conversationSlice.reducer;
