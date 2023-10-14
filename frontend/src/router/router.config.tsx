import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import {routes} from "../constants/routes";
import {ToastProvider} from "../context/ToastContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = lazy(() => import('../App'));

const HomePageLayout = lazy(
  () => import('../layouts/HomePageLayout')
);

const NoPermission = lazy(() => import('../layouts/Permissions/NoPermissionPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const queryClient = new QueryClient();

export const routerConfig: RouteObject[] = [
  {
    path: routes.ROOT,
    element: <App />,
    children: [
      {
        path: routes.ROOT,
        element: (
            <HomePageLayout />
        ),
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
            <LoginPage />
          </ToastProvider>
        </QueryClientProvider>
    ),
  },
  {
    path: routes.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: routes.NOT_FOUND,
    element: <ErrorPage  />,
  },
];
