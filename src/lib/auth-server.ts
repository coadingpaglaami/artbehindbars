// src/lib/auth-server.ts

// This marker causes build error if accidentally imported into client code
import 'server-only';

import { cookies } from 'next/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const AUTH_COOKIE_NAME = 'auth';
export const AUTH_COOKIE_VALUE = 'true';

export async function isAuthenticated(
  cookieStore?: ReadonlyRequestCookies | Promise<ReadonlyRequestCookies>
): Promise<boolean> {
  const jar = await Promise.resolve(cookieStore ?? cookies());
  const authCookie = jar.get(AUTH_COOKIE_NAME)?.value;
  return authCookie === AUTH_COOKIE_VALUE;
}