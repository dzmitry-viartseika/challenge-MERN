import {routes} from "../constants/routes";
import {Link} from "react-router-dom";
import { Button, Container, Row, Col } from 'react-bootstrap';

const BadRequestPage = () => {
    return (
        <div>
            <h3 className="h1 mx-20">Ohh! You caught up Bad Request</h3>
            <Link to={routes.DASHBOARD}>Back to Home page</Link>
        </div>
    )
};

export default BadRequestPage;