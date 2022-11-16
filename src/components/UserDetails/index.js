import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiProfileConstants = {
  isLoading: 'TRUE',
  successful: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
class UserDetails extends Component {
  state = {profileStatus: apiProfileConstants.isLoading, profileDetails: []}

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
    this.setState({profileStatus: apiProfileConstants.isLoading})

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        imageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileStatus: apiProfileConstants.successful,
        profileDetails: updatedData,
      })
    }
    if (response.ok === false) {
      this.setState({profileStatus: apiProfileConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {imageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-view">
        <img src={imageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () =>
    this.setState(
      {profileStatus: apiProfileConstants.isLoading},
      this.getProfile,
    )

  renderFailureView = () => (
    <div className="retry-container">
      <button type="button" onClick={this.onRetry} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case apiProfileConstants.successful:
        return this.renderSuccessView()
      case apiProfileConstants.isLoading:
        return this.renderLoadingView()
      case apiProfileConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-container">{this.renderProfileDetails()}</div>
    )
  }
}

export default UserDetails
