import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/authService.js";

// Rehydrate from any persisted session on load.
const persisted = authService.getSession();

const initialState = {
  user: persisted?.user ?? null,
  token: persisted?.token ?? null,
  status: "idle", // 'idle' | 'loading' | 'error'
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.signUp(credentials);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.signIn(credentials);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  await authService.signOut();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    const onPending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    const onFulfilled = (state, action) => {
      state.status = "idle";
      state.user = action.payload.user;
      state.token = action.payload.token;
    };
    const onRejected = (state, action) => {
      state.status = "error";
      state.error = action.payload ?? "Something went wrong.";
    };
    builder
      .addCase(signUp.pending, onPending)
      .addCase(signUp.fulfilled, onFulfilled)
      .addCase(signUp.rejected, onRejected)
      .addCase(signIn.pending, onPending)
      .addCase(signIn.fulfilled, onFulfilled)
      .addCase(signIn.rejected, onRejected)
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
