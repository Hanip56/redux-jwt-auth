import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../../Global";
import { RootState } from "../../store";

type InitialStateType = {
  user: UserType | null;
  token: string | null;
};

export type SetCredentialsPayloadType = {
  user: UserType | undefined;
  token: string | undefined;
};

const initialState: InitialStateType = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<SetCredentialsPayloadType>
    ) => {
      const { token, user } = action.payload;
      if (token) {
        state.token = token;
      }
      if (user) {
        state.user = user;
      }
    },
    logoutState: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setCredentials, logoutState } = authSlice.actions;

export default authSlice.reducer;
