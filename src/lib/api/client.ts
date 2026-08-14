/**
 * Thin fetch wrapper around the AURUM backend API.
 *
 * - `apiFetch` throws `ApiError` on a non-2xx response (used by interactive
 *   flows that need to surface errors: auth, cart, checkout).
 * - `safeFetch` never throws — it returns a fallback on any failure, so the
 *   storefront keeps rendering (from seed data) even when the API is down.
 *
 * Credentials are always included so the backend's httpOnly auth + cart cookies
 * travel with the request.
 */

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:8080/api';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type FetchOptions = RequestInit & { revalidate?: number };

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { revalidate, headers, ...rest } = options;
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...headers },
    // In server components, control caching; ignored in the browser.
    ...(revalidate != null ? { next: { revalidate } } : { cache: 'no-store' }),
    ...rest,
  });

  const text = await res.text();
  const body = text ? safeJson(text) : null;

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    if (body && typeof body === 'object' && 'error' in body) {
      message = String((body as { error: unknown }).error);
    }
    throw new ApiError(res.status, message);
  }
  return body as T;
}

/** Resilient GET for server-rendered catalog data — falls back on any error. */
export async function safeFetch<T>(
  path: string,
  fallback: T,
  options: FetchOptions = {}
): Promise<T> {
  try {
    return await apiFetch<T>(path, { method: 'GET', ...options });
  } catch {
    return fallback;
  }
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Convenience helpers for interactive (client) calls. */
export const api = {
  get: <T>(p: string, o?: FetchOptions) => apiFetch<T>(p, { method: 'GET', ...o }),
  post: <T>(p: string, body?: unknown, o?: FetchOptions) =>
    apiFetch<T>(p, { method: 'POST', body: body ? JSON.stringify(body) : undefined, ...o }),
  patch: <T>(p: string, body?: unknown, o?: FetchOptions) =>
    apiFetch<T>(p, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined, ...o }),
  del: <T>(p: string, o?: FetchOptions) => apiFetch<T>(p, { method: 'DELETE', ...o }),
};
