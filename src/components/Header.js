import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import util from '../util/util'
let secureStorage = util.hash()
const Header = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const logout = () => {
    if (secureStorage.getItem('userData')) {
      secureStorage.setItem('userData', null)
      secureStorage.clear()
      setIsLoggedOut(true)
    }
  }

  return (
    <div>
      {isLoggedOut ? <Redirect to={'/login'} /> : ''}
      <ul className='app-list'>
        <ol>
          <Link to='/profile'>Dashboard</Link>
        </ol>
        <ol>
          <button onClick={logout}>Logout</button>
        </ol>
      </ul>
    </div>
  )
}
export default Header
