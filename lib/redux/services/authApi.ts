import { apiSlice } from "./apiSlice";
import { AuthUser, setCredentials, logOut } from "../slices/authSlice";

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    user: AuthUser;
    accessToken: string;
    refreshToken?: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name?: string;
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface GoogleLoginPayload {
  access_token: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken && data?.data?.user) {
            dispatch(
              setCredentials({
                user: data.data.user,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
              })
            );
          }
        } catch (err) {
          // Handled by component
        }
      },
    }),

    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: {
          name: userData.fullName || userData.name,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword || userData.password,
        },
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken && data?.data?.user) {
            dispatch(
              setCredentials({
                user: data.data.user,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
              })
            );
          }
        } catch (err) {
          // Handled by component
        }
      },
    }),

    googleLogin: builder.mutation<AuthResponse, GoogleLoginPayload>({
      query: (payload) => ({
        url: "/users/social/google",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken && data?.data?.user) {
            dispatch(
              setCredentials({
                user: data.data.user,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
              })
            );
          }
        } catch (err) {
          // Handled by component
        }
      },
    }),

    getMe: builder.query<{ success: boolean; data: AuthUser }, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logOut());
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;

