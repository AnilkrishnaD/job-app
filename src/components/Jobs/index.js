import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserDetails from '../UserDetails'
import FiltersGroup from '../FiltersGroup'
import ShowJob from '../ShowJob'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.failure,
    activeSalaryRangeId: salaryRangesList[0].salaryRangeId,
    search: '',
    activeEmploymentTypes: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  // filters functions

  onChangeSalary = salary => {
    // console.log(salary)
    this.setState({activeSalaryRangeId: salary}, this.getJobs)
  }

  onChangeEmployment = event => {
    const {activeEmploymentTypes} = this.state
    let updatedList = [...activeEmploymentTypes]
    if (event.target.checked) {
      updatedList = [...activeEmploymentTypes, event.target.value]
    } else {
      updatedList.splice(activeEmploymentTypes.indexOf(event.target.value), 1)
    }

    this.setState({activeEmploymentTypes: updatedList}, this.getJobs)
  }

  onChangeSearch = event => this.setState({search: event.target.value})

  onUpdateSearch = () => {
    this.getJobs()
  }
  // finding jobs function

  getJobs = async () => {
    const {search, activeEmploymentTypes, activeSalaryRangeId} = this.state
    const employmentString = activeEmploymentTypes.join()
    this.setState({apiStatusProfile: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentString}&minimum_package=${activeSalaryRangeId}&search=${search}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogo: eachJob.company_logo_url,
        empType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        id: eachJob.id,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      // console.log(updatedData)
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  // search input element
  renderSearchElement = () => {
    const {search} = this.state
    return (
      <div className="input-container">
        <input
          type="search"
          value={search}
          onChange={this.onChangeSearch}
          placeholder="Search"
          className="input-element"
        />
        <button
          testid="searchButton"
          type="button"
          onClick={this.onUpdateSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  // jobs loading, failure views

  renderSuccessView = () => {
    const {jobsList} = this.state

    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="jobs-container">
        <ul className="jobs-list">
          {jobsList.map(eachJob => (
            <ShowJob jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="nojobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs"
        />
        <h1 className="failure-heading">No Jobs Found</h1>
        <p className="failure-description">
          We could not find any jobs.Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () =>
    this.setState({apiStatus: apiStatusConstants.inProgress}, this.getProfile)

  renderFailureView = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-logo"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.onRetry} className="retry-button">
        Retry
      </button>
    </div>
  )

  // payload of jobs
  renderJobsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="profile-jobs-container">
          <div className="profile-filters-container">
            <UserDetails />
            <hr className="hr-line" />
            <FiltersGroup
              employmentOptions={employmentTypesList}
              salaryOptions={salaryRangesList}
              onChangeSalary={this.onChangeSalary}
              onChangeEmployment={this.onChangeEmployment}
            />
          </div>
          <div>
            {this.renderSearchElement()}
            {this.renderJobsView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
