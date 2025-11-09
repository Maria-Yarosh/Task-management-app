import { POST } from "../../client";


export interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginServerResponse {
  access_token: string;
  refresh_token: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login(data: ILoginRequest): Promise<ILoginResponse> {

  const response = await POST<ILoginServerResponse>("/auth/signIn", data);

  // конвертируем в camelCase
  const accessToken = response.access_token;
  const refreshToken = response.refresh_token;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return { accessToken, refreshToken };
}
