// src/lib/auth/routes.ts

export const AUTH_ONLY_ROUTES = [
  '/chat',
  '/messages',
  '/my-bids',
  '/my-collections',
  '/profile',
  '/art_gallary',
  '/billing_info',
  '/edit_profile',
  '/security'
];

export const GUEST_ONLY_ROUTES = [
  '/login',
  '/signup',
  '/reset-password',
  '/verify',
  '/success'
];

// Accessible by both auth & non-auth users
export const PUBLIC_ROUTES = [
  '/artists',
  '/community',
  '/contact_us',
  '/faq',
  '/our_story',
  '/shop_art',
  '/product'
];

// 🔐 Admin-specific
export const ADMIN_ROOT = '/admin';
export const ADMIN_LOGIN = '/admin/login';
