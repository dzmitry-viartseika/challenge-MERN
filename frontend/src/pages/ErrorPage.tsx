import {routes} from "../constants/routes";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h3>Ohh! page not found</h3>
            <p>We can't seem to find the page you're looking for</p>
            <Link to={routes.DASHBOARD}>Back to Home page</Link>
        </div>
    )
};

export default ErrorPage;