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
    mutationFn: async (userData) => {
      const response = await UserService.loginUser(userData);
      console.log('response', response)
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.exception || 'Login failed');
      }

      return response.json();
    },

    onSuccess: ({data}) => {
      // if (data.status === 400) {
      //   toast.showToast({
      //     id: new Date().getTime(),
      //     severity: 'error',
      //     summary: data.exception,
      //   });
      //   return;
      // }

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
      toast.showToast({
        id: new Date().getTime(),
        severity: 'error',
        summary: error.message,
      });
      navigate('/login');
    },
  });
  const { mutate: loginUser } = mutationResult;

  return { loginUser };
};