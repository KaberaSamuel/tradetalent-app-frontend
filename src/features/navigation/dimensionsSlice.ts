import type { RootState } from "@/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface dimensionProps {
  width: number;
  height: number;
}

export const dimensionsSlice = createSlice({
  name: "dimensions",
  initialState: {
    topbar: { height: 0, width: 0 },
    sidebar: { height: 0, width: 0 },
  },
  reducers: {
    updateTopbarDimensions: (state, action: PayloadAction<dimensionProps>) => {
      state.topbar = action.payload;
    },
    updateSidebarDimensions: (state, action: PayloadAction<dimensionProps>) => {
      state.sidebar = action.payload;
    },
  },
});

export const { updateTopbarDimensions, updateSidebarDimensions } =
  dimensionsSlice.actions;
export const dimensionsSelector = (state: RootState) => state.dimensionsReducer;

export default dimensionsSlice.reducer;
