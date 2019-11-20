import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  usernameField,
  passwordField
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
          <input name="Username"
            {...usernameField.attr}
          />
        </div>
        <div>
      password
          <input name="Password"
            {...passwordField.attr}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  usernameField: PropTypes.object.isRequired,
  passwordField: PropTypes.object.isRequired
}

export default LoginForm