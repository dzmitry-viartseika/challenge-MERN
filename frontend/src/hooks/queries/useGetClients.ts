import { useGetQuery } from '../general/useGetQuery'
import ClientService from '../../services/ClientService'
import { queryKeys } from '../../constants/queryKeys'

export const useGetClients = () => {
  const { data: clientList, isLoading } = useGetQuery<any>(
    [queryKeys.GET_CLIENTS],
    ClientService.getClients(1),
  )

  return { clientList, isLoading }
}
