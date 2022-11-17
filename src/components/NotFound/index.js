import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="app-container">
    <Header />
    <div className="notfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="image"
      />
      <h1 className="heading">Page Not Found</h1>
      <p className="description">
        We're sorry, the page you request could not found.
      </p>
    </div>
  </div>
)

export default NotFound
