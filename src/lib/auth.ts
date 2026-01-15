// src/lib/auth.ts
// No server APIs → completely safe for client

export const AUTH_COOKIE_NAME = 'auth';
export const AUTH_COOKIE_VALUE = 'true';

export function getClientAuthStatus(): boolean {
  if (typeof window === 'undefined') return false;

  // More reliable regex-based cookie read
  const match = document.cookie.match(
    new RegExp('(^| )' + AUTH_COOKIE_NAME + '=([^;]+)')
  );

  return match?.[2] === AUTH_COOKIE_VALUE;
}