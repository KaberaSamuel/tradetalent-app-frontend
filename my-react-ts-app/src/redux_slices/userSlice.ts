import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User } from "../App.types";

const initialState: Array<User> = [
  {
    id: "1",
    name: "testing user",
    email: "test@gmail.com",
  },
];

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;

export default userSlice.reducer;
