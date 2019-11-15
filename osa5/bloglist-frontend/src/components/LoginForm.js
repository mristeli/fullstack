import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin()
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
      username
          <input
            type="text"
            defaultValue={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
      password
          <input
            type="password"
            defaultValue={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm