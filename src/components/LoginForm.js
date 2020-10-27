import { Input, message } from 'antd'
import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './index.css'
import util from '../util/util'
let secureStorage = util.hash()

export class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      uri:
        process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '',
      isRedirectReqd: false,
      email: '',
      password: '',
      isLoading: false
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formSubmit = e => {
    e.preventDefault()
    const { uri, email, password } = this.state
    let obj = {
      email: email,
      password: password
    }
    // call login api
    axios
      .post(uri.concat(`/api/v1/login`), obj)
      .then(res => {
        let data = res.data
        if (data.success) {
          secureStorage.setItem('userData', data.data)
          // localStorage.setItem('userData', JSON.stringify(data.data))
          this.setState({
            isRedirectReqd: true
          })
        }
      })
      .catch(err => {
        message.error(`Login error: ${err.response.data.msg}`)
      })
  }

  render () {
    if (this.state.isRedirectReqd) {
      return <Redirect to={'/profile'} />
    }
    if (secureStorage.getItem('userData')) {
      return <Redirect to={'/profile'} />
    }

    const { isLoading, email, password } = this.state
    return (
      <div className='container'>
        <h2>Login</h2>
        <form onSubmit={this.formSubmit} className='login-form'>
          <Input
            placeholder='Email'
            name='email'
            required
            value={email}
            onChange={this.changeHandler}
          />
          <Input.Password
            style={{ marginTop: '10px' }}
            placeholder='Enter password'
            name='password'
            required
            value={password}
            onChange={this.changeHandler}
          />
          <p style={{ marginTop: '10px' }}>
            <button type='submit'>Login</button>
          </p>
        </form>
        <a href='/signup'>Signup here</a>
      </div>
    )
  }
}

export default LoginForm
