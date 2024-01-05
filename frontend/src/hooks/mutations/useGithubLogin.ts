import { useNavigate } from 'react-router-dom'
import UserService from '../../services/UserService'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '../../context/ToastContext'

interface IProps {
  // reset: UseFormReset<FutureTenderGroupSaveDto>;
}

export const useGithubLogin = () => {
  const mutationResult = useMutation({
    mutationFn: () => UserService.githubLogin(),

    onSuccess: ({ data }) => {
      console.log('useGithubLogin', data.user)
      // localStorage.setItem('user', data.user);
      // console.log('wertey')
      // toast.showToast({
      //   id: new Date().getTime(),
      //   severity: 'success',
      //   summary: 'You are logged in successfully',
      // });
      // const { accessToken } = data.user;
      // localStorage.setItem('token', accessToken);
      // navigate('/dashboard');
    },
    onError: (error: any) => {
      console.log('error', error)
      // toast.showToast({
      //   id: new Date().getTime(),
      //   severity: 'error',
      //   summary: error.response.data,
      // });
      // console.log('xxx')
      // navigate('/login');
    },
  })
  const { mutate: githubLogin } = mutationResult

  return { githubLogin }
}
