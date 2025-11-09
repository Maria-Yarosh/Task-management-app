import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./thunks";

interface IRegisterState {
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IRegisterState = {
  isLoading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Registration failed";
      });
  },
});

export const { clearError } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
