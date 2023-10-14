import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService";
import {useMutation} from "@tanstack/react-query";

export const useRegisterUser = () => {
  const navigate = useNavigate();

  const mutationResult = useMutation({
    mutationFn: (userData) =>
      UserService.registerUser(userData),

    onSuccess: (data: any) => {
      navigate('/dashboard');
    },
    onError: (error: any) => {
      navigate('/login');
    },
  });
  const { mutate: registerUser } = mutationResult;

  return { registerUser };
};