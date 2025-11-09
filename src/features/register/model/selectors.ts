import type { RootState } from "../../../store/store";

export const selectRegisterLoading = (state: RootState) => state.register.isLoading;

export const selectRegisterError = (state: RootState) => state.register.error;

export const selectRegisterTokens = (state: RootState) => ({
  accessToken: state.register.accessToken,
  refreshToken: state.register.refreshToken,
});
