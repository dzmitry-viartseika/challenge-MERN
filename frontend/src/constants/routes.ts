export const routes = {
  ROOT: '/',
  DASHBOARD: '/dashboard',
  NO_PERMISSION: '/no-permission',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET: '/reset-password',
  FORGET_PASSWORD: '/forgot-password/:link',
  NOT_FOUND: '*',
} as const;
