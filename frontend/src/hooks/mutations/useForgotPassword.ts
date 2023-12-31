import { useNavigate } from 'react-router-dom'
import UserService from '../../services/UserService'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '../../context/ToastContext'

interface IProps {
  // reset: UseFormReset<FutureTenderGroupSaveDto>;
}

export const useForgotPassword = () => {
  // const { showMessageTopLevel, showMessageBottomLevel } = useMessage();

  const navigate = useNavigate()
  const toast = useToast()

  // NoticeViewDto[],
  // ApiError,
  // FutureTenderGroupSaveDto
  const mutationResult = useMutation({
    mutationFn: (data: any) => UserService.resetUserPassword(data),

    // onSuccess: ({data}) => {
    //   console.log('wertey')
    //   toast.showToast({
    //     id: new Date().getTime(),
    //     severity: 'success',
    //     summary: 'You are logged in successfully',
    //   });
    //   const { accessToken } = data.user;
    //   localStorage.setItem('token', accessToken);
    //   navigate('/dashboard');
    // },
    // onError: (error: any) => {
    //   toast.showToast({
    //     id: new Date().getTime(),
    //     severity: 'error',
    //     summary: error.response.data,
    //   });
    //   console.log('xxx')
    //   navigate('/login');
    // },
  })
  const { mutate: forgotPassword } = mutationResult

  return { forgotPassword }
}
