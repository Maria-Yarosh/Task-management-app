import { POST } from "../../client";

interface IRegisterRequest {
  email: string;
  password: string;
}

interface IRegisterServerResponse {
  access_token: string;
  refresh_token: string;
}

export interface IRegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export async function register(data: IRegisterRequest): Promise<IRegisterResponse> {
  const response = await POST<IRegisterServerResponse>("/auth/signUp", data);

  const accessToken = response.access_token;
  const refreshToken = response.refresh_token;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return { accessToken, refreshToken };
}
