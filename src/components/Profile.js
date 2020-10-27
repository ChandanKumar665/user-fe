import { message, Button } from 'antd'
import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import './index.css'
import util from '../util/util'
import User from './User'

let secureStorage = util.hash()

export default class Profile extends Component {
  constructor () {
    super()
    this.state = {
      list: [],
      userid: '',
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      age: '',
      uri: 'http://localhost:4000'
    }
  }
  get = (uri, userid) => {
    let new_uri = uri.concat(`/api/v1/user/${userid}`)
    axios
      .get(new_uri)
      .then(res => {
        let data = res.data
        if (data.success) {
          this.setState({
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            email: data.data.email,
            age: data.data.age,
            gender: data.data.gender,
            list: data.data.skills
          })
        }
      })
      .catch(err => {
        message.error('DB error.')
      })
  }

  componentDidMount = () => {
    const { uri } = this.state
    // const userData = JSON.parse(sessionStorage.getItem('userData'))
    const userData = secureStorage.getItem('userData')
    if (userData) {
      this.setState({
        userid: userData.id
      })
      this.get(uri, userData.id)
    }
  }

  render () {
    let { list, firstName, gender, age } = this.state
    if (!secureStorage.getItem('userData')) {
      return <Redirect to={'/login'} />
    }
    return (
      <div className='container'>
        <Header />
        <h2>Welcome {firstName}</h2>
        {firstName ? <User name={firstName} gender={gender} age={age} /> : ''}
      </div>
    )
  }
}
