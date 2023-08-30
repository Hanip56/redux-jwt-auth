import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  SetCredentialsPayloadType,
  logoutState,
  setCredentials,
} from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  prepareHeaders: (Headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // send refresh token
    const refreshTokenResult = await baseQuery(
      "/api/auth/refresh",
      api,
      extraOptions
    );

    if (refreshTokenResult?.data) {
      api.dispatch(
        setCredentials(refreshTokenResult.data as SetCredentialsPayloadType)
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutState());
    }
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Pin", "OwnPin", "SinglePin", "SingleUser", "SavedPin"],
});

export default apiSlice;
