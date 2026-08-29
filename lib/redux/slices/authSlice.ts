import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  id?: string;
  _id?: string;
  name?: string;
  fullName?: string;
  email: string;
  role?: "USER" | "ADMIN";
  planTier?: "STARTER" | "PRO" | "BUSINESS";
  active?: boolean;
  image?: string;
  avatarUrl?: string;
  companyName?: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const getStoredToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("workradar_token") || null;
  }
  return null;
};

const getStoredUser = (): AuthUser | null => {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("workradar_user");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

const initialToken = getStoredToken();
const initialUser = getStoredUser();

const initialState: AuthState = {
  user: initialUser,
  accessToken: initialToken,
  refreshToken: typeof window !== "undefined" ? localStorage.getItem("workradar_refresh_token") : null,
  isAuthenticated: Boolean(initialToken && initialUser),
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        accessToken: string;
        refreshToken?: string;
      }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken || null;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.setItem("workradar_token", accessToken);
        localStorage.setItem("workradar_user", JSON.stringify(user));
        if (refreshToken) {
          localStorage.setItem("workradar_refresh_token", refreshToken);
        }
      }
    },
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== "undefined") {
          localStorage.setItem("workradar_user", JSON.stringify(state.user));
        }
      }
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("workradar_token");
        localStorage.removeItem("workradar_refresh_token");
        localStorage.removeItem("workradar_user");
        localStorage.removeItem("workradar_organization");
        localStorage.removeItem("workradar_workspace_details");
        sessionStorage.clear();
      }
    },
  },
});

export const { setCredentials, updateUser, logOut, setLoading, setError } =
  authSlice.actions;

export default authSlice.reducer;
