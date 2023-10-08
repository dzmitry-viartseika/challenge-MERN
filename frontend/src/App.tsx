import { useState, useEffect } from 'react';
import UsersService from './services/UserService';


import { useQuery, QueryClient } from '@tanstack/react-query';
import { InputText } from 'primereact/inputtext';


import 'primereact/resources/themes/vela-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { AxiosResponse } from 'axios';



const queryClient = new QueryClient();

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}

interface UsersResponse {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  users: User[];
}
function App() {
  // const [page] = useState(1);
  // const {
  //   isLoading,
  //   isError,
  //   data: usersList,
  //   isPreviousData,
  // } = useQuery({
  //   queryKey: ['usersList', page],
  //   queryFn: () => fetchProjects(page),
  //   keepPreviousData: true,
  //   staleTime: 5000,
  // });
  //
  // async function fetchProjects(page = 1) {
  //   const response: AxiosResponse<UsersResponse> = await UsersService.getUsers(page);
  //   return response.data.users ?? [];
  // }
  //
  // useEffect(() => {
  //   if (!isPreviousData && usersList) {
  //     queryClient.prefetchQuery({
  //       queryKey: ['projects', page + 1],
  //       queryFn: () => fetchProjects(page + 1),
  //     });
  //   }
  // }, [usersList, isPreviousData, page]);
  //
  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  return (
    <div>
      App
    </div>
  );
}

App.displayName = 'App';
export default App;
