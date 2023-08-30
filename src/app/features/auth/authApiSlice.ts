import { UserType } from "../../../Global";
import apiSlice from "../../api/apiSlice";

type RegisterArgs = {
  username: string;
  email: string;
  password: string;
};

type LoginArgs = {
  email: string;
  password: string;
};

type ResultResponse = {
  user: UserType;
  token: string;
};

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ResultResponse, RegisterArgs>({
      query: (credentials) => ({
        url: "/api/auth",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<ResultResponse, LoginArgs>({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => "/api/auth/logout",
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;
