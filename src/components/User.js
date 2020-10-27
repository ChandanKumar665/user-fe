import { message, Button, Row, Col, Input } from 'antd'
import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import './index.css'
import Board from './Board'
import Card from './Card'

export default class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: ['Javascript', 'Python', 'CSS', 'HTML', 'Java'],
      userid: '',
      firstName: this.props.name || '',
      lastName: '',
      email: '',
      gender: this.props.gender || '',
      age: this.props.age || ''
    }
  }

  componentDidMount = () => {
    const { uri } = this.state
  }

  render () {
    let { data, firstName, age, gender } = this.state
    let fields = {
      name: firstName,
      age: age,
      gender: gender
    }

    return (
      <div className=''>
        <form
          className='container'
          style={{ width: '50%' }}
          //   onSubmit={this.formSubmit}
        >
          {Object.keys(fields).map((item, i) => (
            <Row style={{ marginTop: '10px' }} key={i}>
              <Col span={4}>
                <label>
                  <strong>{item}:</strong>
                </label>
              </Col>
              <Col span={16}>
                <Input name={item} value={fields[item] || ''} disabled />
              </Col>
            </Row>
          ))}
          <Row style={{ marginTop: '10px' }}>
            <Col span={4}>
              <label>
                <strong>Skills:</strong>
              </label>
            </Col>
          </Row>
          <div className='wrapper'>
            <Board id='board2' className='board1'></Board>

            <Board id='board1' className='board1'>
              {data.map((item, i) => (
                <Card id={`card${i}`} className='card' draggable={true}>
                  <Row>
                    {/* <Col span={4}>
                      <label>{i + 1}.</label>
                    </Col> */}
                    <Col span={16}>
                      <label>{item}</label>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Board>
          </div>
        </form>
      </div>
    )
  }
}
