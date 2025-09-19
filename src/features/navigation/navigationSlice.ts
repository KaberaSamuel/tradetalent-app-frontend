import type { RootState } from "@/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: "home",
  reducers: {
    updateActiveTab: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { updateActiveTab } = navigationSlice.actions;
export const navigationSelector = (state: RootState) => state.navigationReducer;

export default navigationSlice.reducer;
