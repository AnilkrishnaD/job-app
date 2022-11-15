import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const apiProfileConstants = {
  isLoading: 'TRUE',
  successful: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
class UserDetails extends Component {
  state = {profileStatus: apiProfileConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    return <h1>Profile</h1>
  }
}

export default UserDetails
