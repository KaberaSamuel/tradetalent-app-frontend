import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { UserTypes } from "@/App.types";

interface InitialStateTypes {
  token: {
    access: string;
    refresh: string;
  };
  user: UserTypes;
}

const initialUser = {
  name: "",
  first_name: "",
  email: "",
  location: "",
  about: "",
  name_initials: "",
  services_offered: "",
  services_needed: "",
  profile_image: null,
};

const initialState: InitialStateTypes = {
  token: {
    access: "",
    refresh: "",
  },
  user: initialUser,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateTokens: (state, action) => {
      state.token = action.payload;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
    },

    // clean user data and tokens after a logout
    clear: () => {
      return initialState;
    },
  },
});

export const { updateTokens, updateUser, clear } = authSlice.actions;
export const authSelector = (state: RootState) => state.authReducer;

export default authSlice.reducer;
