// src/lib/auth/auth-server.ts
import 'server-only';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN_COOKIE } from './constant';

export interface JwtPayload {
  sub: string;
  email: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
}

export async function getServerAccessToken(): Promise<string | undefined> {
  return (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
}

export async function decodeServerToken(): Promise<JwtPayload | null> {
  try {
    const token = await getServerAccessToken();
    if (!token) return null;
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export async function isServerAuthenticated(): Promise<boolean> {
  const payload = await decodeServerToken();
  if (!payload) return false;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}
