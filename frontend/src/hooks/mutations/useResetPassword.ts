import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService";
import {useMutation} from "@tanstack/react-query";
import {useToast} from "../../context/ToastContext";

interface IProps {
  // reset: UseFormReset<FutureTenderGroupSaveDto>;
}

export const useResetPassword = () => {
  // const { showMessageTopLevel, showMessageBottomLevel } = useMessage();

  const navigate = useNavigate();
  const toast = useToast();

  // NoticeViewDto[],
  // ApiError,
  // FutureTenderGroupSaveDto
  const mutationResult = useMutation({
    mutationFn: (data: any) =>
      UserService.changeUserPassword(data),

    onSuccess: () => {
      toast.showToast({
        id: new Date().getTime(),
        severity: 'success',
        summary: 'You have already changed password successfully',
      });
      navigate('/login');
    },
    // onError: (error: any) => {
    //   toast.showToast({
    //     id: new Date().getTime(),
    //     severity: 'error',
    //     summary: error.response.data,
    //   });
    //   console.log('xxx')
    //   navigate('/login');
    // },
  });
  const { mutate: resetPassword } = mutationResult;

  return { resetPassword };
};