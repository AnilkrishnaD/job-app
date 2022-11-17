import {Link} from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import {GiFlowerStar} from 'react-icons/gi'
// import {MdOutlineWorkOutline} from 'react-icons/md'

import './index.css'

const ShowJob = props => {
  const {jobDetails} = props
  const {
    companyLogo,
    id,
    empType,
    location,
    packagePerAnnum,
    jobDescription,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="list-item">
        <div className="job-item">
          <div className="logo-title-container">
            <img src={companyLogo} alt={title} className="logo" />
            <div className="title-container">
              <h1 className="heading">{title}</h1>
              <div className="rating-container">
                <GiFlowerStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-type">
              <GoLocation />
              <span>{location}</span>

              <span>{empType}</span>
            </div>
            <span>{packagePerAnnum}</span>
          </div>
          <hr />
          <h1 className="heading">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default ShowJob
