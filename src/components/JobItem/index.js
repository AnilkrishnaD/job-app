import {Component} from 'react'
import Cookies from 'js-cookie'
import {Loader} from 'react-loader-spinner'
import Header from '../Header'
import JobItemDetails from '../JobItemDetails'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}
class JobItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    similarJobsList: [],
    jobDetails: {},
  }

  componentDidMount() {
    this.getJobData()
  }

  // updating similar jobs data

  getSimilarJobData = job => ({
    companyLogoUrl: job.company_logo_url,
    empType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
  })

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    // console.log(apiUrl)

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedJobDetails = {
        title: data.job_details.title,
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        jobDescription: data.job_details.job_description,
        empType: data.job_details.employment_type,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyImgUrl: data.job_details.life_at_company.image_url,
        skills: data.job_details.skills.map(eachItem => ({
          name: eachItem.name,
          skillImageUrl: eachItem.image_url,
        })),
      }
      const similarJobDetails = data.similar_jobs.map(eachJob =>
        this.getSimilarJobData(eachJob),
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        similarJobsList: similarJobDetails,
        jobDetails: updatedJobDetails,
      })
    }
    if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  // render failure, success, loading views

  renderSuccessView = () => {
    const {similarJobsList, jobDetails} = this.state

    return (
      <div className="app-container">
        <JobItemDetails jobDetails={jobDetails} />
        <h1 className="heading">Similar Jobs</h1>
        <ul className="similar-jobs">
          {similarJobsList.map(eachItem => (
            <SimilarJobs key={eachItem.id} similarJobDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#777777" height="50" width="50" />
    </div>
  )

  onRetry = () =>
    this.setState({apiStatus: apiStatusConstants.inProgress}, this.getJobData)

  renderFailureView = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-logo"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seen the page what you are looking for.
      </p>
      <button type="button" onClick={this.onRetry} className="retry-button">
        Retry
      </button>
    </div>
  )

  // pay load views of job item
  renderJobItemViews = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        {this.renderJobItemViews()}
      </div>
    )
  }
}

export default JobItem
