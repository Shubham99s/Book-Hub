import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div id="not-found">
    <img
      src="https://res.cloudinary.com/dygfievoq/image/upload/v1693378976/Group_7484_j9sjb9.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>
      We are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <button type="button">
      <Link className="link" to="/">
        Go Back to Home
      </Link>
    </button>
  </div>
)

export default NotFound
