const BASE_URL = "https://task-manager-6hji.onrender.com"

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

function saveTokens(accessToken: string, refreshToken?: string) {
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
}

function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

async function request<T>(
  url: string,
  method: string,
  body?: unknown,
  customHeaders: Record<string, string> = {},
  retry = true
): Promise<T> {
  const token = getAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (response.status === 401 && retry) {
    const refreshed = await refreshToken();

    if (refreshed) {
      return request<T>(url, method, body, customHeaders, false);
    } else {
      clearTokens();
      throw new Error("Unauthorized: token expired");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed: ${response.status}`);
  }

   return response.json() as Promise<T>

}

async function refreshToken(): Promise<boolean> {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refresh }),
    });

    if (!response.ok) return false;

    const data = await response.json();

    if (data.access_token) {
      saveTokens(data.access_token, data.refresh_token);
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

export function GET<T>(url: string, headers?: Record<string, string>) {
  return request<T>(url, "GET", undefined, headers);
}

export function POST<T>(url: string, body?: unknown, headers?: Record<string, string>) {
  return request<T>(url, "POST", body, headers);
}

export function PUT<T>(url: string, body?: unknown, headers?: Record<string, string>) {
  return request<T>(url, "PUT", body, headers);
}

export function DELETE<T>(url: string, headers?: Record<string, string>) {
  return request<T>(url, "DELETE", undefined, headers);
}

export function logout() {
  clearTokens();
}