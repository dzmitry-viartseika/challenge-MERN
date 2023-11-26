import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from './context/ToastContext';
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
