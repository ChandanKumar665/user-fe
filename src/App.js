import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import Profile from './components/Profile'

function App () {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
