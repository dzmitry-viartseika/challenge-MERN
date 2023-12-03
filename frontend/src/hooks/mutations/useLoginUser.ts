import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService";
import {useMutation} from "@tanstack/react-query";
import {useToast} from "../../context/ToastContext";
import {useCurrentUser} from "../../context/userContext";

interface IProps {
  // reset: UseFormReset<FutureTenderGroupSaveDto>;
}

export const useLoginUser = () => {
  // const { showMessageTopLevel, showMessageBottomLevel } = useMessage();

  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const toast = useToast();

  // NoticeViewDto[],
  // ApiError,
  // FutureTenderGroupSaveDto
  const mutationResult = useMutation({
    mutationFn: (userData) =>
      UserService.loginUser(userData),

    onSuccess: ({data}) => {
      toast.showToast({
        id: new Date().getTime(),
        severity: 'success',
        summary: 'You are logged in successfully',
      });
      console.log('wertey')
      const { accessToken } = data;
      localStorage.setItem('token', accessToken);
      currentUser.updateCurrentUser(data)
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.showToast({
        id: new Date().getTime(),
        severity: 'error',
        summary: error.response.data,
      });
      navigate('/login');
    },
  });
  const { mutate: loginUser } = mutationResult;

  return { loginUser };
};