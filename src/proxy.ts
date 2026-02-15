// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import {
  AUTH_ONLY_ROUTES,
  GUEST_ONLY_ROUTES,
  PUBLIC_ROUTES,
  ADMIN_ROOT,
  ADMIN_LOGIN,
} from "@/lib/authroute";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constant";

interface JwtPayload {
  exp: number;
  role: "USER" | "ADMIN";
}

function getAuthInfo(token?: string): {
  isAuth: boolean;
  role?: "USER" | "ADMIN";
} {
  if (!token) return { isAuth: false };

  try {
    const payload = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp <= now) return { isAuth: false };

    return { isAuth: true, role: payload.role };
  } catch {
    return { isAuth: false };
  }
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Always allow static/media
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/media") ||
    pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const { isAuth, role } = getAuthInfo(token);

  /* ---------------- PUBLIC ROUTES ---------------- */
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  /* ---------------- ADMIN ROUTES ---------------- */

  // admin login → guest only
  if (pathname === ADMIN_LOGIN) {
    if (isAuth && role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // everything under /admin/*
  if (pathname.startsWith(ADMIN_ROOT)) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  /* ---------------- GUEST ONLY ---------------- */
  if (GUEST_ONLY_ROUTES.some((route) => pathname.startsWith(route)) && isAuth) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  /* ---------------- AUTH ONLY ---------------- */
  if (AUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route)) && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!favicon.ico).*)"],
};
