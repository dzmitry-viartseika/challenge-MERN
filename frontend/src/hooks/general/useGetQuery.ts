import { QueryFunction, useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import {uriPaths} from "../../constants/uriPaths";

type TUseGetQueryOptions<GenericType> = Omit<
  UseQueryOptions<GenericType[], any, GenericType[]>,
  'queryKey' | 'queryFn' | 'initialData'
> & { initialData?: () => undefined };

export const useGetQuery = <T>(
  queryKey: string[],
  queryFn: QueryFunction<T[]>,
  options = {
    retry: 2,
    staleTime: 5 *60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
  } as TUseGetQueryOptions<T>
) => {
  const navigate = useNavigate();
  // const queryResult = useQuery<T[], ApiError, T[]>(queryKey, queryFn, options);
  const queryResult = useQuery<T[], any, T[]>(queryKey, queryFn, options);

  const { isError, data, isLoading, error } = queryResult;

    if (isError) {
        if (error?.status === 403) {
            navigate(uriPaths.NO_PERMISSION);
        } else {
            navigate(routes.NOT_FOUND);
        }
    }

    return { data, isLoading };
};
