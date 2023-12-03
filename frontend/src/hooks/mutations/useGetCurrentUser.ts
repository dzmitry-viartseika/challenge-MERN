import { useGetQuery } from '../general/useGetQuery';
import ClientService from '../../services/ClientService'
import {queryKeys} from "../../constants/queryKeys";
import UserService from "../../services/UserService";
import {useMutation} from "@tanstack/react-query";
import {useCurrentUser} from "../../context/userContext";
import {useNavigate} from "react-router-dom";

export const useGetCurrentUser = () => {
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();
    console.log('useGetCurrentUser')
    const mutationResult = useMutation({
        mutationFn: () =>
            UserService.currentUser(),

        onSuccess: ({data}) => {
            console.log('data', data)
            const { accessToken } = data;
            localStorage.setItem('token', accessToken);
            currentUser.updateCurrentUser(data)
            navigate('/dashboard');
        },
        onError: (error: any) => {
            // toast.showToast({
            //     id: new Date().getTime(),
            //     severity: 'error',
            //     summary: error.response.data,
            // });
            // navigate('/login');
        },
    });
    const { mutate: getCurrentUser } = mutationResult;

    return { getCurrentUser };
};