import {Avatar} from "primereact/avatar";
import {useUser} from "../../context/userContext";

const Profile = () => {
    const userContext = useUser();
    const { user } = userContext;

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            {user && <Avatar image={user.user.avatarUrl} size="xlarge" shape="circle" />}
            {user && <div>{user.user.displayName}</div>}
        </div>
    )
}

Profile.displayName = 'Profile';
export default Profile;