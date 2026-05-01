import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  role: string;
}

type SessionStatus = "idle" | "checking" | "valid" | "invalid";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionStatus: SessionStatus;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  sessionStatus: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    updateAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setSessionStatus(state, action: PayloadAction<SessionStatus>) {
      state.sessionStatus = action.payload;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.sessionStatus = "idle";
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCredentials,
  updateAccessToken,
  setSessionStatus,
  logout,
  setLoading,
} = authSlice.actions;
export default authSlice.reducer;
