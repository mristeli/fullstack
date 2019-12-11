import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import loginService from './services/login'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'

import  { useField } from './hooks'

import { initializeBlogs } from './reducers/blogReducer'
import { showError, removeMessage } from './reducers/notificationReducer'

function App ({ initializeBlogs, showError, removeMessage }) {
  useEffect(() => {
    initializeBlogs()
  })

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const [user, setUser] = useState(null)

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async () => {
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      removeMessage()
      username.reset()
      password.reset()
    } catch(exception) {
      showError('wrong username or password', 5)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const loginForm = () => (
    <div className='loginForm'>
      <h2>Log in to application</h2>
      <Notification />
      <LoginForm
        usernameField={username}
        passwordField={password}
        handleLogin={handleLogin}
      />
    </div>
  )

  return (
    <div>
      {user ===null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p> 
          <BlogList
            user={user}
          />
        </div>
      }
    </div>
  )
}

export default connect(null, { initializeBlogs, showError, removeMessage })(App)
