import {Avatar} from "primereact/avatar";
import {useUser} from "../../context/userContext";
import {useLogOut} from "../../hooks/mutations/useLogOut";
import ButtonBase from "../Buttons/ButtonBase";

const Profile = () => {
    const userContext = useUser();
    const { logOutUser } = useLogOut()
    const { user } = userContext;
    console.log('user', user)

    const logOut = () => {
        logOutUser()
    }
    return (
        <div>
            <ButtonBase severity="info" text="LogOut" handleClickEvent={logOut} />
            <div className="d-flex flex-column justify-content-center align-items-center">
                {user && <Avatar image={user.user.avatarUrl} size="xlarge" shape="circle" />}
                {user && <div>{user.user.displayName}</div>}
            </div>
        </div>
    )
}

Profile.displayName = 'Profile';
export default Profile;