import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, type ILoginRequest, type ILoginResponse } from "../../../shared/api/auth/login/login";

interface IRejectValue {
    error: string;
}

export const loginUser = createAsyncThunk<
  ILoginResponse, 
  ILoginRequest,  
  { rejectValue: IRejectValue } 
>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      return response;
    } catch (err: unknown) {
        let message = "Не удалось войти. Попробуйте снова"
      if (err instanceof Error) message = err.message 
        return rejectWithValue({ error: message });
      
    }
  }
);
