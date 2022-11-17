import {GoLocation} from 'react-icons/go'
import {GiFlowerStar} from 'react-icons/gi'
import './index.css'

const JobItemDetails = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    empType,
    id,
    lifeAtCompanyDescription,
    lifeAtCompanyImgUrl,
    location,
    packagePerAnnum,
    rating,
    skills,
    title,
    jobDescription,
  } = jobDetails

  const skillItem = eachItem => (
    <div className="skill">
      <img
        alt={eachItem.name}
        src={eachItem.skillImageUrl}
        className="skill-img"
      />
      <p className="skill-name">{eachItem.name}</p>
    </div>
  )

  return (
    <div className="job-container">
      <div className="job-item">
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
        <div className="location-package-container">
          <div className="location-type">
            <GoLocation />
            <span>{location}</span>

            <span>{empType}</span>
          </div>
          <span>{packagePerAnnum}</span>
        </div>
        <hr />
        <div className="description-link-container">
          <h1 className="heading">Description</h1>
          <a href={`${companyWebsiteUrl}`}>Visit</a>
        </div>
        <p>{jobDescription}</p>
      </div>
      <div className="skills-container">
        <h1 className="heading">Skills</h1>
        <div className="skills-list">
          {skills.map(eachItem => skillItem(eachItem))}
        </div>
      </div>
      <h1 className="heading">Life at Company</h1>
      <div className="life-company-container">
        <p className="life-description">{lifeAtCompanyDescription}</p>
        <img
          src={lifeAtCompanyImgUrl}
          alt="life at company"
          className="life-img"
        />
      </div>
    </div>
  )
}

export default JobItemDetails
