import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

interface InitialStateTypes {
  my_listings: number;
  messages: number;
  profile_views: number;
}

const initialState: InitialStateTypes = {
  my_listings: 0,
  messages: 0,
  profile_views: 0,
};

export const activitiesSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateMyListings: (state, action) => {
      state.my_listings = action.payload;
    },

    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { updateMyListings, updateMessages } = activitiesSlice.actions;

export const activitiesSelector = (state: RootState) => state.activitiesReducer;

export default activitiesSlice.reducer;
