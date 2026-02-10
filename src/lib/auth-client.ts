// src/lib/auth/auth-client.ts
'use client';

import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN_COOKIE } from './constant';

export interface JwtPayload {
  sub: string;
  email: string;
  role: 'USER' | 'ADMIN';
  iat: number;
  exp: number;
}

export function getClientAccessToken(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(
    new RegExp('(^| )' + ACCESS_TOKEN_COOKIE + '=([^;]+)')
  );

  return match?.[2] ?? null;
}

export function decodeClientToken(): JwtPayload | null {
  try {
    const token = getClientAccessToken();
    if (!token) return null;
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function isClientAuthenticated(): boolean {
  const payload = decodeClientToken();
  if (!payload) return false;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}
