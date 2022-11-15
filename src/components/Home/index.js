import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="app-container">
    <Header />
    <div className="Home-container">
      <h1 className="heading">Find The Job That Fits For Your Life</h1>
      <p className="description">
        Millions of people are searching for jobs, salary information,company
        reviews.Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="jobs-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
