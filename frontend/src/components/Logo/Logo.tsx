import {Avatar} from "primereact/avatar";
import {useNavigate} from "react-router-dom";
import {routes} from "../../constants/routes";
import {LOGO_URL} from "../../constants/logoUrl";

const Logo = () => {
    const navigate = useNavigate();
    const onProceedToHome = () => {
        navigate(routes.LANDING)
    }
    return (
        <div className="d-flex justify-content-center align-items-center m-2">
            <Avatar image={LOGO_URL} onClick={onProceedToHome} className="flex align-items-center justify-content-center mr-2" size="xlarge" />
        </div>
)
};

export default Logo;