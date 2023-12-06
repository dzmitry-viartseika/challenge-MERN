import {Roles} from "../ts/enums/Roles";
import {useCurrentUser} from "../context/userContext";

export const useUserRole = () => {
    const { currentUser: { user } } = useCurrentUser();



    const isSuperAdmin = user.role === Roles.SUPER_ADMIN;
    const isAdmin = user.role === Roles.ADMIN;
    const isClient = user.role === Roles.CLIENT;
    const isModerator = user.role === Roles.MODERATOR;

    return {
        isSuperAdmin,
        isClient,
        isAdmin,
        isModerator,
    };
};
