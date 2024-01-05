import { routes } from '../constants/routes'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const ErrorPage = () => {
  return (
    <div>
      <h3 className="h1 mx-20">Ohh! page not found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to={routes.DASHBOARD}>Back to Home page</Link>
      <Button className="btn btn-primary" variant="primary">
        Click me
      </Button>
    </div>
  )
}

export default ErrorPage
