import React from 'react'
import { connect } from 'react-redux'

import { setLoggedInUser } from '../reducers/authenticationReducer'
import { showError, removeMessage } from '../reducers/notificationReducer'

import loginService from '../services/login'

import Notification from '../components/Notification'
import { useField } from '../hooks'


const LoginForm = ({ setLoggedInUser, showError, removeMessage }) => {

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
    } catch(exception) {
      showError('wrong username or password', 5)
    }
  }

  return (
    <div className='loginForm'>
      <h2>Log in to application</h2>
      <Notification />
      <div>
        <form onSubmit={onSubmit}>
          <div>
          username
            <input name="username"
              {...username.attr}
            />
          </div>
          <div>
          password
            <input name="password"
              {...password.attr}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  )
}

export default connect(
  null,
  { setLoggedInUser, showError, removeMessage }
)(LoginForm)