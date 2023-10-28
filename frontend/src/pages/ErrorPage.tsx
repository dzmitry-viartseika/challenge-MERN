import {routes} from "../constants/routes";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h1>404 page</h1>
            <Link to={routes.DASHBOARD}>Proceed to Home page</Link>
        </div>
    )
};

export default ErrorPage;