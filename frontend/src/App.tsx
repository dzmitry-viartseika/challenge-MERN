import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PrimeReactProvider } from 'primereact/api';
import { ToastProvider } from './context/ToastContext';
import './index.css';


const queryClient = new QueryClient();
const App = () => {
    return (
      <QueryClientProvider client={queryClient}>
          <PrimeReactProvider>
              <ToastProvider>
                  <main className="flex">
                      <Outlet />
                  </main>
              </ToastProvider>
          </PrimeReactProvider>

              <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
  );
}

App.displayName = 'App';
export default App;
