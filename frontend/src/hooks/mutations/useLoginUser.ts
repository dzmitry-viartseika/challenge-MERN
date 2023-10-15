import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService";
import {useMutation} from "@tanstack/react-query";
import {useToast} from "../../context/ToastContext";

interface IProps {
  // reset: UseFormReset<FutureTenderGroupSaveDto>;
}

export const useLoginUser = () => {
  // const { showMessageTopLevel, showMessageBottomLevel } = useMessage();

  const navigate = useNavigate();
  const toast = useToast();

  // NoticeViewDto[],
  // ApiError,
  // FutureTenderGroupSaveDto
  const mutationResult = useMutation({
    mutationFn: (userData) =>
      UserService.loginUser(userData),

    onSuccess: ({data}) => {
      const { accessToken } = data.user;
      localStorage.setItem('token', accessToken);
      navigate('/dashboard');
    },
    onError: (error: any) => {
      console.log('error', error)
      toast.showToast({
        id: new Date().getTime(),
        severity: 'error',
        summary: error.response.data,
      });
      // if (futureTendersErrors.BUDGET_TITLES_NOT_UNIQUE === error.body?.code) {
      //   showMessageBottomLevel(
      //     Messages.createErrorMessage(t('alertMessages.notUniqueBudgetTitles'))
      //   );
      // } else {
      //   navigate(routes.HOME);
      // }
      navigate('/login');
    },
  });
  const { mutate: loginUser } = mutationResult;

  return { loginUser };
};