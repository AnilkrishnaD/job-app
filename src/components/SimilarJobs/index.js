import {GoLocation} from 'react-icons/go'
import {GiFlowerStar} from 'react-icons/gi'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    empType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-card">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="logo"
        />
        <div className="title-container">
          <h1 className="heading">{title}</h1>
          <div className="rating-container">
            <GiFlowerStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="heading">Description</h1>
      <p>{jobDescription}</p>
      <div className="location-empType-container">
        <GoLocation />
        <span className="location">{location}</span>
        <span className="emp-type">{empType}</span>
      </div>
    </li>
  )
}

export default SimilarJobs
