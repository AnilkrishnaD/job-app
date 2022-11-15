import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="logo"
      />
      <div className="home-job-container">
        <li className="list-item">
          <Link to="/" className="link-item">
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link to="jobs" className="link-item">
            Jobs
          </Link>
        </li>
      </div>

      <button type="button" onClick={onClickLogout} className="button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
