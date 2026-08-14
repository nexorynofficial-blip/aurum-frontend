import { api } from './client';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthResponse {
  user: AuthUser;
  token: string;
}

export function apiRegister(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  return api.post<AuthResponse>('/auth/register', input);
}

export function apiLogin(input: { email: string; password: string }) {
  return api.post<AuthResponse>('/auth/login', input);
}

export function apiLogout() {
  return api.post<{ message: string }>('/auth/logout');
}

export function apiMe() {
  return api.get<{ user: AuthUser }>('/auth/me');
}

export function apiForgotPassword(email: string) {
  return api.post<{ message: string }>('/auth/forgot-password', { email });
}

export function apiResetPassword(token: string, password: string) {
  return api.post<{ message: string }>('/auth/reset-password', { token, password });
}
