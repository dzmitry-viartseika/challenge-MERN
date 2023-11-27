import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from './context/ToastContext';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {routes} from "./constants/routes";
import {useIdleTimer} from "react-idle-timer";

const queryClient = new QueryClient();
const App = () => {
    const navigate = useNavigate();

    const onIdle = () => {
        navigate(routes.LOGIN)
    }

    useIdleTimer({
        onIdle,
        timeout: 900_000,
        throttle: 500
    })
    return (
      <QueryClientProvider client={queryClient}>
              <ToastProvider>
                  <main className="flex">
                      <Outlet />
                  </main>
              </ToastProvider>
              <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
  );
}

App.displayName = 'App';
export default App;
