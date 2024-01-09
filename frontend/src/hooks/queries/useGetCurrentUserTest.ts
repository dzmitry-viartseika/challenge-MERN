import { useGetQuery } from '../general/useGetQuery'
import ClientService from '../../services/ClientService'
import { queryKeys } from '../../constants/QueryKeys'
import UserService from '../../services/UserService'
import { useCurrentUser } from '../../context/userContext'

export const useGetCurrentUserTest = () => {
  const { currentUser } = useCurrentUser()
  const { userData, isLoading } = useGetQuery<any>(
    [queryKeys.GET_CURRENT_USER],
    UserService.currentUser(),
  )

  if (userData) {
    currentUser.updateCurrentUser(userData)
  }
  return { userData, isLoading }
}
