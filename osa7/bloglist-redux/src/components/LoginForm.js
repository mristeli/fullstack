import React from 'react'
import { connect } from 'react-redux'

import { setLoggedInUser } from '../reducers/authenticationReducer'
import { showError, removeMessage } from '../reducers/notificationReducer'

import loginService from '../services/login'
import { useField } from '../hooks'

import { Form, Button } from 'react-bootstrap'

import {
  withRouter
} from 'react-router-dom'

const LoginForm = ({ history, setLoggedInUser, showError, removeMessage }) => {

  const username = useField('text')
  const password = useField('password')

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(event.target)
  }

  const handleLogin = async (target) => {
    try {
      const user = await loginService.login({
        username: target.username.value, password: target.password.value
      })
      removeMessage()
      setLoggedInUser(user)
      history.push('/')
    } catch(exception) {
      showError('wrong username or password', 5)
    }
  }

  return (
    <div className='loginForm'>
      <h2>Log in to application</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control name="username"
            id="username"
            {...username.attr}
          />
          <Form.Label>password</Form.Label>
          <Form.Control name="password"
            id="password"
            {...password.attr}
          />
          <Button variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default connect(
  null,
  { setLoggedInUser, showError, removeMessage }
)(withRouter(LoginForm))