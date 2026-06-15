import { api } from '@/api/http';
import type { User } from '@/types/user';

/** Result of a successful login/registration: the JWT and the user. */
export interface AuthResponse {
  token: string;
  user: User;
}

/** Fields required to register a new account. */
export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

/** Logs in with a username/email (`login`) and password. */
export async function login(login: string, password: string): Promise<AuthResponse> {
  return api.post<AuthResponse>('/auth/login', { login, password });
}

/** Registers a new account and returns its auth token + user. */
export async function register(input: RegisterInput): Promise<AuthResponse> {
  return api.post<AuthResponse>('/auth/register', input);
}
