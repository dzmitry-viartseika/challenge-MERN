import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService";
import {useMutation} from "@tanstack/react-query";
import {useToast} from "../../context/ToastContext";
import {routes} from "../../constants/routes";

export const useLogOut = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const mutationResult = useMutation({
        mutationFn: () =>
            UserService.logOutUser(),

        onSuccess: () => {
            toast.showToast({
                id: new Date().getTime(),
                severity: 'success',
                summary: 'You are logged out successfully',
            });
            localStorage.removeItem('token');
            navigate(routes.LOGIN);
        },
        onError: (error: any) => {
            console.log('error', error)
            toast.showToast({
                id: new Date().getTime(),
                severity: 'error',
                summary: 'Something went wrong!',
            });
            navigate(routes.LOGIN);
        },
    });
    const { mutate: logOutUser } = mutationResult;

    return { logOutUser };
};