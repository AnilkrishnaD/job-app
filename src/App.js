import {Route, Switch, Redirect} from 'react-router-dom'
import LogInForm from './components/LogInForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LogInForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <Redirect to="/login" />
  </Switch>
)

export default App
