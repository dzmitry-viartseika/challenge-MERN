import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PrimeReactProvider } from 'primereact/api';
import { ToastProvider } from './context/ToastContext';
import './index.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

const queryClient = new QueryClient();
const App = () => {
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
