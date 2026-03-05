const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body?: unknown
  ) {
    super(`API error ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, headers: customHeaders, ...rest } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...customHeaders,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) {
    let errorBody: unknown;
    try {
      errorBody = await response.json();
    } catch {
      // no parseable body
    }
    throw new ApiError(response.status, response.statusText, errorBody);
  }

  // 204 No Content — nothing to parse
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

export const apiClient = {
  get<T>(path: string, opts?: RequestOptions) {
    return request<T>(path, { ...opts, method: "GET" });
  },
  post<T>(path: string, body: unknown, opts?: RequestOptions) {
    return request<T>(path, { ...opts, method: "POST", body });
  },
  put<T>(path: string, body: unknown, opts?: RequestOptions) {
    return request<T>(path, { ...opts, method: "PUT", body });
  },
  delete<T>(path: string, opts?: RequestOptions) {
    return request<T>(path, { ...opts, method: "DELETE" });
  },
};
