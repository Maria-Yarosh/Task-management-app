import { createAsyncThunk } from "@reduxjs/toolkit";
import { register, type IRegisterResponse } from "../../../shared/api/auth/register/register";

interface IRegisterArgs {
  email: string;
  password: string;
}

interface IRejectValue {
  error: string;
}

export const registerUser = createAsyncThunk<
  IRegisterResponse, 
  IRegisterArgs,          
  { rejectValue: IRejectValue } 
>(
  "register/user",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await register({ email, password });

      return response;
    } catch (error) {
      let message = "Registration failed";
      if (error instanceof Error) message = error.message;

      return rejectWithValue({ error: message });
    }
  }
);
