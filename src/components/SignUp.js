import { Input, message, Select } from 'antd'
import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './index.css'
import util from '../util/util'

let secureStorage = util.hash()
const { Option } = Select
export class SignUp extends Component {
  constructor () {
    super()
    this.state = {
      uri:
        process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '',
      isRedirectReqd: false,
      gotologin: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isLoading: false,
      gender: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  selectHandler = val => {
    this.setState({
      gender: val
    })
  }

  formSubmit = e => {
    e.preventDefault()
    const { uri, firstName, lastName, email, password, gender } = this.state
    if (!firstName || !lastName || !email || !password || !gender) {
      message.error('Please fill/select all the fields.')
      return
    }
    let obj = {
      email: email,
      pass: password,
      firstName: firstName,
      lastName: lastName,
      gender: gender
    }
    // call signup api
    axios
      .post(uri.concat(`/api/v1/user`), obj)
      .then(res => {
        let data = res.data
        if (data.success) {
          message.success(data.msg)
          this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            gender: '',
            gotologin: true
          })
        }
      })
      .catch(err => {
        message.error(`Error: ${err.response.data.msg}`)
      })
  }

  render () {
    const { gotologin, email, firstName, lastName, password } = this.state

    if (secureStorage.getItem('userData')) {
      return <Redirect to={'/profile'} />
    } else if (gotologin) {
      return <Redirect to={'/login'} />
    }

    return (
      <div className='container'>
        <h2>Sign Up</h2>
        <form onSubmit={this.formSubmit} className='login-form'>
          <Input
            placeholder='First Name'
            name='firstName'
            required
            value={firstName}
            onChange={this.changeHandler}
          />
          <Input
            style={{ marginTop: '10px' }}
            placeholder='Last Name'
            name='lastName'
            required
            value={lastName}
            onChange={this.changeHandler}
          />
          <Input
            style={{ marginTop: '10px' }}
            placeholder='Email'
            name='email'
            required
            value={email}
            onChange={this.changeHandler}
          />
          <Input.Password
            style={{ marginTop: '10px' }}
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={this.changeHandler}
          />
          <Select
            style={{ marginTop: '10px', width: '100%' }}
            placeholder='Gender'
            onChange={this.selectHandler}
          >
            <Option value='M'>Male</Option>
            <Option value='F'>Female</Option>
          </Select>
          <p style={{ marginTop: '10px' }}>
            <button type='submit'>Sign Up</button>
          </p>
        </form>
        <a href='/login'>Login</a>
      </div>
    )
  }
}

export default SignUp
