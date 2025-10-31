import type { ConversationTypes } from "@/App.types";
import type { RootState } from "@/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ConversationTypes = {
  id: "",
  name: "",
  last_message: null,
  other_user: {
    name: "",
    slug: "",
    email: "",
    location: "",
    about: "",
    services_offered: "",
    services_needed: "",
    my_listings_count: 0,
  },
};

const conversationSlice = createSlice({
  name: "conversationReducer",
  initialState,
  reducers: {
    updateActiveConversation: (_, action: PayloadAction<ConversationTypes>) => {
      return action.payload;
    },
  },
});

export const { updateActiveConversation } = conversationSlice.actions;
export const activeConversationSelector = (
  state: RootState
): ConversationTypes => state.conversationReducer;

export default conversationSlice.reducer;
