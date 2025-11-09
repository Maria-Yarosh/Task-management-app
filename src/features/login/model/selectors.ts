import type { RootState } from "../../../store/store";

export const selectAuthAccessToken = (state: RootState) => state.auth.accessToken;

export const selectAuthStatus = (state: RootState) => state.auth.status;

export const selectAuthError = (state: RootState) => state.auth.error;

// при желании: селектор для всех токенов
export const selectAuthTokens = (state: RootState) => ({
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});