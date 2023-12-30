import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import {routes} from "../constants/routes";
import {ToastProvider} from "../context/ToastContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import {UserProvider} from "../context/userContext";

const App = lazy(() => import('../App'));

const HomePageLayout = lazy(
  () => import('../layouts/HomePageLayout')
);

const NoPermission = lazy(() => import('../layouts/Permissions/NoPermissionPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const BadRequestPage = lazy(() => import('../pages/BadRequestPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const queryClient = new QueryClient();

export const routerConfig: RouteObject[] = [
  {
    path: routes.LANDING,
    element: (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </ToastProvider>
        </QueryClientProvider>
            ),
    children: [
      {
        path: routes.LANDING,
        element: (
            <LandingPage />
        ),
      },
      {
        path: routes.DASHBOARD,
        element: <DashboardPage />
      },
      {
        path: routes.NO_PERMISSION,
        element: <NoPermission />,
      },
    ],
  },
  {
    path: routes.LOGIN,
    element: (
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <UserProvider>
                <LoginPage />
            </UserProvider>
          </ToastProvider>
        </QueryClientProvider>
    ),
  },
  {
    path: routes.REGISTER,
    element: (
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
              <UserProvider>
                  <RegisterPage />
              </UserProvider>
          </ToastProvider>
        </QueryClientProvider>
    ),
  },
  {
    path: routes.FORGET_PASSWORD,
    element: (
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <ForgetPasswordPage />
          </ToastProvider>
        </QueryClientProvider>
    ),
  },
  {
    path: routes.RESET,
    element: (
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <ResetPasswordPage />
          </ToastProvider>
        </QueryClientProvider>
    ),
  },
    {
        path: routes.LANDING,
        element: <LandingPage  />,
    },
    {
        path: routes.ERROR_BAD_REQUEST,
        element: <BadRequestPage  />,
    },
  {
    path: routes.NOT_FOUND,
    element: <ErrorPage  />,
  },
];
