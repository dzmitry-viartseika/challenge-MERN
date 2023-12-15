import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService";
import {useMutation} from "@tanstack/react-query";
import {useToast} from "../../context/ToastContext";
import {useCurrentUser} from "../../context/userContext";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const toast = useToast();
  const mutationResult = useMutation({
    mutationFn: (userData) =>
        UserService.loginUser(userData),

    onSuccess: ({data}) => {
      console.log('data', data);
      // const { data } = response;
      // console.log('data', data)
      if (data.status === 400) {
        toast.showToast({
          id: new Date().getTime(),
          severity: 'error',
          summary: data.message,
        });
        return;
      }

      toast.showToast({
        id: new Date().getTime(),
        severity: 'success',
        summary: 'You are logged in successfully',
      });
      const { accessToken } = data;
      localStorage.setItem('token', accessToken);
      currentUser.updateCurrentUser(data)
      navigate('/dashboard');
    },
    onError: (error: any) => {
      console.log('error', error)
      toast.showToast({
        id: new Date().getTime(),
        severity: 'error',
        summary: error.response.data.exception,
      });
      navigate('/login');
    },
  });
  const { mutate: loginUser } = mutationResult;

  return { loginUser };
};