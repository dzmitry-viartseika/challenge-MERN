import { QueryFunction, useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { useNavigate } from 'react-router-dom';

// import { ApiError } from '../../api/generated/core/ApiError';
import { routes } from '../../constants/routes';

type TUseGetQueryOptions<GenericType> = Omit<
  // UseQueryOptions<GenericType[], ApiError, GenericType[]>,
  UseQueryOptions<GenericType[], any, GenericType[]>,
  'queryKey' | 'queryFn' | 'initialData'
> & { initialData?: () => undefined };

/**
 *    The default behavior of the hook is to cache a data,
 * which means 'fetchOnMount' will only work once.
 * Default behavior must be used
 * only for data that does not change in the database
 * data.
 *    The default behavior can be overridden by passing option as an argument
 *    !Importantly, this is NOT a service hook that is designed to
 * implement business logic
 */
export const useGetQuery = <T>(
  queryKey: string[],
  queryFn: QueryFunction<T[]>,
  options = {
    retry: 2,
    refetchOnMount: true,
  } as TUseGetQueryOptions<T>
) => {
  const navigate = useNavigate();
  // const queryResult = useQuery<T[], ApiError, T[]>(queryKey, queryFn, options);
  const queryResult = useQuery<T[], any, T[]>(queryKey, queryFn, options);

  const { isError, data, isLoading } = queryResult;

  // if (isError) {
  //   navigate(routes.ERROR_BAD_REQUEST);
  // }

  return { data, isLoading };
};
