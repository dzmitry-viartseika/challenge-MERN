import {routes} from "../constants/routes";
import {Link} from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <Link to={routes.LOGIN}>Login/Register</Link>
        </div>
    )
};

export default LandingPage;